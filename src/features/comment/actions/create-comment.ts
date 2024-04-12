'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { filesSchema } from '@/features/attachment/schemas/files';
import { doCreateAttachments } from '@/features/attachment/services/create-attachments';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketPath } from '@/paths';

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
  files: filesSchema,
});

export const createComment = async (
  ticketId: string,
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getCurrentAuthOrRedirect();

  let comment;
  let attachments;

  try {
    const { content, files } = createCommentSchema.parse({
      content: formData.get('content'),
      files: formData.getAll('files'),
    });

    comment = await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId,
        content,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        ticket: true,
      },
    });

    attachments = await doCreateAttachments({
      subject: comment,
      entity: 'COMMENT',
      entityId: comment.id,
      files,
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toFormState('SUCCESS', 'Comment created', {
    ...comment,
    attachments,
  });
};
