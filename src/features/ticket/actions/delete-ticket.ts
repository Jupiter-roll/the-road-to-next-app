"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToFormState,
  toFormState,
} from "@/components/form/utils/to-form-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toFormState("ERROR", "Not authorized");
    }

    await prisma.ticket.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));
  revalidatePath(ticketsPath());
  setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
