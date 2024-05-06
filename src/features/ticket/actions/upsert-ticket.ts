'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';
import { toCent } from '@/utils/currency';

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
  const { user } = await getCurrentAuthOrRedirect({
    checkActiveOrganization: true, // reference #1 (default anyway)
  });

  try {
    if (id) {
      await prisma.ticket.findUniqueOrThrow({
        where: {
          id,
          userId: user.id,
        },
      });
    }

    const data = upsertTicketSchema.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      deadline: formData.get('deadline'),
      bounty: formData.get('bounty'),
    });

    const dbData = {
      ...data,
      userId: user.id,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: {
        id: id || '',
      },
      update: dbData,
      create: {
        ...dbData,
        organizationId: user.activeOrganizationId!, // careful #1
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  if (id) {
    setCookieByKey('toast', 'Ticket updated');
    redirect(ticketPath(id));
  }

  revalidatePath(ticketsPath());

  return toFormState('SUCCESS', 'Ticket created');
};
