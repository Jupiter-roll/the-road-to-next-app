"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const createTicket = async (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.create({
    data: {
      title: data.title as string,
      content: data.content as string,
    },
  });

  revalidatePath(ticketsPath());
};
