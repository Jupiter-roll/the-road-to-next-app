'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { setCookieByKey } from '@/actions/cookies';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { fromErrorToFormState } from '@/components/form/utils/to-form-state';

export const deleteTicket = async (id: string) => {
  const user = await getCurrentUserOrRedirect();

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
