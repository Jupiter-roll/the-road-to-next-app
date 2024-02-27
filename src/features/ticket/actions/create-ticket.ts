'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(191),
});

export const createTicket = async (
  _formState: FormState,
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
    return fromErrorToFormState(error);
  }

  revalidatePath('/tickets');

  return toFormState('SUCCESS', 'Ticket created');
};
