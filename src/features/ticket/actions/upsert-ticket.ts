'use server';

import currency from 'currency.js';
import { z } from 'zod';
import { prisma } from '@/services/prisma';
import { revalidatePath } from 'next/cache';
import { FormState, transformError } from '@/utils/transform-error';
import { redirect } from 'next/navigation';
import { signInPath, ticketPath, ticketsPath } from '@/utils/paths';
import { validateRequest } from '@/features/auth/queries/validate-request';

const upsertTicketSchema = z.object({
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

export const upsertTicket = async (
  id: string | undefined,
  _formState: FormState,
  formData: FormData
) => {
  try {
    const rawFormData = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const { user } = await validateRequest();

    if (!user) {
      redirect(signInPath());
    }

    const dbData = {
      userId: user.id,
      ...rawFormData,
      bounty: currency(rawFormData.bounty).intValue,
    };

    if (id) {
      await prisma.ticket.update({
        where: {
          id,
        },
        data: dbData,
      });
    } else {
      await prisma.ticket.create({
        data: dbData,
      });
    }
  } catch (error) {
    return transformError(error);
  }

  revalidatePath(ticketsPath());

  if (id) {
    redirect(ticketPath(id));
  }

  return {
    status: 'SUCCESS' as const,
    fieldErrors: {},
    // would not show up for update, because we redirect anyway
    message: `Ticket ${id ? 'updated' : 'created'} successfully!`,
    timestamp: Date.now(),
  };
};
