'use server';

import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { prisma } from '@/services/prisma';
import { ticketPath } from '@/utils/paths';
import { transformError } from '@/utils/transform-error';
import { revalidatePath } from 'next/cache';

export const deleteComment = async (id: string) => {
  const { user } = await getCurrentUserOrRedirect();

  try {
    await prisma.comment.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    return transformError(error);
  }

  revalidatePath(ticketPath(id));

  return {
    status: 'SUCCESS' as const,
    message: 'Comment deleted successfully',
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
