"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from "@/components/form/utils/to-form-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse({
      content: formData.get("content"),
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

  return toFormState("SUCCESS", "Comment created");
};
