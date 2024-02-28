'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { toCent } from '@/lib/big';

const createTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
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
        ...data,
        bounty: toCent(data.bounty),
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath('/tickets');

  return toFormState('SUCCESS', 'Ticket created');
};
