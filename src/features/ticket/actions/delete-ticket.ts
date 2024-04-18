"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(ticketPath(id));
  revalidatePath(ticketsPath());
  setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
