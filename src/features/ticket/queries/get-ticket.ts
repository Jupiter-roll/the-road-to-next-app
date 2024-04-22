import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
