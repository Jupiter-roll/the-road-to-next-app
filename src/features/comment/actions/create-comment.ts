'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';
import { CommentWithUser } from '../types';

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _formState: FormState,
  formData: FormData
) => {
  const user = await getCurrentUserOrRedirect();

  let comment;

  try {
    const data = createCommentSchema.parse({
      content: formData.get('content'),
    });

    comment = await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId: ticketId,
        ...data,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toFormState('SUCCESS', 'Comment created', comment);
};
