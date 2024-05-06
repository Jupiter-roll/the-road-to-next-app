'use server';

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
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';
import { filesSchema } from '../schemas/files';
import * as attachmentService from '../services';
import { isComment, isTicket } from '../types';

const createAttachmentsSchema = z.object({
  files: filesSchema.refine(
    (files) => files.length !== 0,
    'File is required'
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

  try {
    const { files } = createAttachmentsSchema.parse({
      files: formData.getAll('files'),
    });

    await attachmentService.createAttachments({
      subject,
      entity,
      entityId,
      files,
    });
  } catch (error) {
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
