'use server';

import { revalidatePath } from 'next/cache';

import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';

export const deleteComment = async (id: string) => {
  const user = await getCurrentUserOrRedirect();

  try {
    await prisma.comment.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));

  return toFormState('SUCCESS', 'Comment deleted');
};
