'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ticketPath, ticketsPath } from '@/paths';
import { prisma } from '@/lib/prisma';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { toCent } from '@/utils/currency';
import { cookies } from 'next/headers';

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Is required'),
  bounty: z.coerce.number().positive(),
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
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const dbData = {
      ...data,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: id || '',
      },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  if (id) {
    cookies().set('toast', 'Ticket updated');
    redirect(ticketPath(id));
  }

  revalidatePath(ticketsPath());

  return toFormState('SUCCESS', 'Ticket created');
};
