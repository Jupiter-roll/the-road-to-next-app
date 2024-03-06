'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ticketsPath } from '@/paths';
import { prisma } from '@/lib/prisma';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export const upsertTicket = async (
  id: string | undefined,
  _formState: { message: string },
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
    });

    await prisma.ticket.upsert({
      where: {
        id: id || '',
      },
      update: data,
      create: data,
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  if (id) redirect(ticketsPath());
  revalidatePath(ticketsPath());

  return toFormState('SUCCESS', 'Ticket created');
};
