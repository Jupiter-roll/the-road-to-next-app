'use server';

import { TicketStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketPath, ticketsPath } from '@/paths';

export const updateTicketStatus = async (
  id: string,
  ticketStatus: TicketStatus
) => {
  const user = await getCurrentUserOrRedirect();

  try {
    await prisma.ticket.update({
      where: {
        id,
        userId: user.id,
      },
      data: {
        status: ticketStatus,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketsPath());
  revalidatePath(ticketPath(id));

  return toFormState('SUCCESS', 'Status updated');
};
