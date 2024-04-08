'use server';

import { revalidatePath } from 'next/cache';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { isOwner } from '@/features/auth/utils/is-owner';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';

export const deleteAttachment = async (id: string) => {
  const { user } = await getCurrentAuthOrRedirect();

  const attachment = await prisma.attachment.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      ticket: true,
    },
  });

  if (!isOwner(user, attachment.ticket)) {
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
        id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));

  return toFormState('SUCCESS', 'Attachment deleted');
};
