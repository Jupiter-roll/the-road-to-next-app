'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { ticketPath, ticketsPath } from '@/paths';
import { TicketStatus } from '@prisma/client';
import { getCurrentUserOrRedirect } from '@/features/auth/queries/get-current-user-or-redirect';

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
