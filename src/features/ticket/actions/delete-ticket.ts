'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { setCookieByKey } from '@/actions/cookies';
import { fromErrorToFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';

export const deleteTicket = async (id: string) => {
  const { user } = await getCurrentAuthOrRedirect();

  try {
    await prisma.ticket.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketsPath());
  setCookieByKey('toast', 'Ticket deleted');
  redirect(ticketsPath());
};
