'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { setCookieByKey } from '@/actions/cookies';

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(ticketsPath());
  setCookieByKey('toast', 'Ticket deleted');
  redirect(ticketsPath());
};
