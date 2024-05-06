'use server';

import { revalidatePath } from 'next/cache';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import * as ticketService from '@/features/ticket/services';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';

export const deleteComment = async (id: string) => {
  const { user } = await getCurrentAuthOrRedirect();

  try {
    const comment = await prisma.comment.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    await ticketService.disconnectReferencedTickets(comment);
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));

  return toFormState('SUCCESS', 'Comment deleted');
};
