'use server';

import { z } from 'zod';
import { prisma } from '@/services/prisma';
import { revalidatePath } from 'next/cache';
import { FormState, transformError } from '@/utils/transform-error';

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(191),
});

export const createTicket = async (
  _formState: FormState,
  formData: FormData
) => {
  try {
    const rawFormData = createTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });

    await prisma.ticket.create({
      data: {
        title: rawFormData.title,
        content: rawFormData.content,
      },
    });
  } catch (error) {
    return transformError(error);
  }

  revalidatePath('/tickets');

  return {
    status: 'SUCCESS' as const,
    fieldErrors: {},
    message: 'Ticket created successfully!',
    timestamp: Date.now(),
  };
};
