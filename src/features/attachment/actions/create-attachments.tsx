'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AttachmentEntity } from '@prisma/client';
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
import { isComment, isTicket } from '../types';
import { getOrganizationIdByAttachment } from '../utils/attachment-helpers';
import { generateS3Key } from '../utils/generate-s3-key';
import { sizeInMB } from '../utils/size-in-mb';

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

type CreateAttachmentsArgs = {
  entityId: string;
  entity: AttachmentEntity;
};

export const createAttachments = async (
  { entityId, entity }: CreateAttachmentsArgs,
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getCurrentAuthOrRedirect();

  let subject;

  switch (entity) {
    case 'TICKET': {
      subject = await prisma.ticket.findUnique({
        where: {
          id: entityId,
        },
      });
      break;
    }
    case 'COMMENT': {
      subject = await prisma.comment.findUnique({
        where: {
          id: entityId,
        },
        include: {
          ticket: true,
        },
      });
      break;
    }
    default:
      return toFormState('ERROR', 'Subject not found');
  }

  if (!subject) {
    return toFormState('ERROR', 'Subject not found');
  }

  if (!isOwner(user, subject)) {
    return toFormState('ERROR', 'Not the owner of this subject');
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
          ...(entity === 'TICKET' ? { ticketId: entityId } : {}),
          ...(entity === 'COMMENT' ? { commentId: entityId } : {}),
          entity,
        },
      });

      const organizationId = getOrganizationIdByAttachment(
        entity,
        subject
      );

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
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

  switch (entity) {
    case 'TICKET':
      if (isTicket(subject)) {
        revalidatePath(ticketPath(subject.id));
      }
      break;
    case 'COMMENT': {
      if (isComment(subject)) {
        revalidatePath(ticketPath(subject.ticket.id));
      }
      break;
    }
  }

  return toFormState('SUCCESS', 'Attachment(s) uploaded');
};
