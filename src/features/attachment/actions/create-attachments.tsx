'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { s3 } from '@/lib/aws/s3';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';
import { ACCEPTED_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { generateKey, sizeInMB } from '../utils';

const createAttachmentsSchema = z.object({
  files: z
    .custom<FileList>()
    .refine(
      (files) =>
        Array.from(files ?? []).some(
          (file) => sizeInMB(file.size) !== 0
        ),
      `The file is empty`
    )
    .refine(
      (files) => Array.from(files ?? []).length !== 0,
      'File is required'
    )
    .refine(
      (files) =>
        Array.from(files ?? []).every(
          (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
        ),
      `The maximum file size is ${MAX_IMAGE_SIZE}MB`
    )
    .refine(
      (files) =>
        Array.from(files ?? []).every((file) =>
          ACCEPTED_TYPES.includes(file.type)
        ),
      'File type is not supported'
    ),
});

export const createAttachments = async (
  ticketId: string,
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getCurrentAuthOrRedirect();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!ticket) {
    return toFormState('ERROR', 'Ticket not found');
  }

  if (!isOwner(user, ticket)) {
    return toFormState('ERROR', 'Not the owner of this ticket');
  }

  let attachment;

  try {
    const { files } = createAttachmentsSchema.parse({
      files: formData.getAll('files'),
    });

    for (const file of Array.from(files)) {
      const buffer = await Buffer.from(await file.arrayBuffer());

      attachment = await prisma.attachment.create({
        data: {
          name: file.name,
          ticketId: ticket.id,
        },
      });

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateKey({
            organizationId: ticket.organizationId,
            ticketId: ticket.id,
            fileName: file.name,
            attachmentId: attachment.id,
          }),
          Body: buffer,
          ContentType: file.type,
        })
      );
    }
  } catch (error) {
    // fallback if S3 upload fails, but attachment was created
    if (attachment) {
      await prisma.attachment.delete({
        where: {
          id: attachment.id,
        },
      });
    }

    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toFormState('SUCCESS', 'Attachment(s) uploaded');
};
