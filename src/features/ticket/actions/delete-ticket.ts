'use server';

import { prisma } from '@/services/prisma';
import { transformError } from '@/utils/transform-error';
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
    return transformError(error);
  }

  // revalidatePath(`/tickets/${id}`);
  revalidatePath(`/tickets`);
  redirect(`/tickets`);
};
