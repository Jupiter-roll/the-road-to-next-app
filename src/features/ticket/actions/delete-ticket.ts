'use server';

import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { prisma } from '@/services/prisma';
import { ticketPath, ticketsPath } from '@/utils/paths';
import { transformError } from '@/utils/transform-error';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteTicket = async (id: string) => {
  const { user } = await getCurrentUserOrRedirect();

  try {
    await prisma.ticket.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
    return transformError(error);
  }

  revalidatePath(ticketPath(id));
  revalidatePath(ticketsPath());

  redirect(ticketsPath());
};
