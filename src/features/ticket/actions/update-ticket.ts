"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicket = async (id: string, formData: FormData) => {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.update({
    where: {
      id,
    },
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
