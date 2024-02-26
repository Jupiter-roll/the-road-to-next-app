'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(191),
});

export const createTicket = async (
  _formState: { message: string },
  formData: FormData
) => {
  try {
    const data = createTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });

    await prisma.ticket.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
  } catch (error) {
    return {
      message: 'Something went wrong',
    };
  }

  revalidatePath('/tickets');

  return {
    message: '',
  };
};
