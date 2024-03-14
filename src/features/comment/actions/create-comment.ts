'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import {
  FormState,
  fromErrorToFormState,
} from '@/components/form/utils/to-form-state';
import { ticketPath } from '@/paths';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { redirect } from 'next/navigation';

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _formState: FormState,
  formData: FormData
) => {
  const user = await getCurrentUserOrRedirect();

  try {
    const data = createCommentSchema.parse({
      content: formData.get('content'),
    });

    await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId: ticketId,
        ...data,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(ticketId));

  redirect(ticketPath(ticketId));

  // return {
  //   status: 'SUCCESS' as const,
  //   fieldErrors: {},
  //   message: `Comment created!`,
  //   timestamp: Date.now(),
  // };
};
