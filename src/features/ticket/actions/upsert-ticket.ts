'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { toCent } from '@/lib/big';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  id: string | undefined,
  _formState: FormState,
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const sharedData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    if (id) {
      await prisma.ticket.update({
        where: {
          id,
        },
        data: sharedData,
      });
    } else {
      await prisma.ticket.create({
        data: sharedData,
      });
    }
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath('/tickets');

  if (id) {
    redirect(`/tickets/${id}`);
  }

  return toFormState('SUCCESS', 'Ticket created');
};
