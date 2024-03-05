'use server';

import { fromErrorToFormState } from '@/components/form/utils/to-form-state';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteTicket = async (id: string) => {
  try {
    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));
  revalidatePath(ticketsPath());

  redirect(ticketsPath());
};
