'use server';

import currency from 'currency.js';
import { z } from 'zod';
import { prisma } from '@/services/prisma';
import { revalidatePath } from 'next/cache';
import { FormState, transformError } from '@/utils/transform-error';

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(191),
  deadline: z
    .string({
      required_error: 'Is required',
      invalid_type_error: 'Is required',
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
});

export const createTicket = async (
  _formState: FormState,
  formData: FormData
) => {
  try {
    const data = createTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    await prisma.ticket.create({
      data: {
        title: data.title,
        content: data.content,
        deadline: data.deadline,
        bounty: currency(data.bounty).intValue,
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
