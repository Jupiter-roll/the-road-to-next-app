'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';
import { fromErrorToFormState } from '@/components/form/utils/to-form-state';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';

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

  return {
    status: 'SUCCESS' as const,
    message: 'Comment deleted',
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
