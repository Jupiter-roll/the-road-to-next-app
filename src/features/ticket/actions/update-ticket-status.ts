"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fromErrorToFormState,
  toFormState,
} from "@/components/form/utils/to-form-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));
  revalidatePath(ticketsPath());

  return toFormState("SUCCESS", "Status updated");
};
