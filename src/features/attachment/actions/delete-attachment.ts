'use server';

import { revalidatePath } from 'next/cache';
import { setCookieByKey } from '@/actions/cookies';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';
import { isComment, isTicket } from '../types';
import { getOrganizationIdByAttachment } from '../utils/attachment-helpers';
import { generateS3Key } from '../utils/generate-s3-key';

export const deleteAttachment = async (id: string) => {
  const { user } = await getCurrentAuthOrRedirect();

  const attachment = await prisma.attachment.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      ticket: true,
      comment: {
        include: {
          ticket: true,
        },
      },
    },
  });

  const subject = attachment.ticket ?? attachment.comment;

  if (!subject) {
    return toFormState('ERROR', 'Subject not found');
  }

  const organizationId = getOrganizationIdByAttachment(
    attachment.entity,
    subject
  );

  if (!isOwner(user, subject)) {
    return toFormState('ERROR', 'Not authorized');
  }

  try {
    await prisma.attachment.delete({
      where: {
        id,
      },
    });

    await inngest.send({
      name: 'app/attachment.deleted',
      data: {
        key: generateS3Key({
          organizationId,
          entityId: subject.id,
          entity: attachment.entity,
          fileName: attachment.name,
          attachmentId: attachment.id,
        }),
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  switch (attachment.entity) {
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

  setCookieByKey('toast', 'Attachment deleted');
};
