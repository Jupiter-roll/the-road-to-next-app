'use server';

import { z } from 'zod';
import { prisma } from '@/services/prisma';
import { revalidatePath } from 'next/cache';
import { FormState, transformError } from '@/utils/transform-error';
import { ticketPath } from '@/utils/paths';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';

const createCommentSchema = z.object({
  content: z.string().min(1).max(191),
});

export const createComment = async (
  ticketId: string,
  _formState: FormState,
  formData: FormData
) => {
  try {
    const { user } = await getCurrentUserOrRedirect();

    const rawFormData = createCommentSchema.parse({
      content: formData.get('content'),
    });

    await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId: ticketId,
        ...rawFormData,
      },
    });
  } catch (error) {
    return transformError(error);
  }

  revalidatePath(ticketPath(ticketId));

  return {
    status: 'SUCCESS' as const,
    fieldErrors: {},
    message: `Comment created successfully!`,
    timestamp: Date.now(),
  };
};
