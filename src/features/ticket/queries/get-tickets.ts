import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
      },
    },
    orderBy: {
      ...(searchParams.sort === "newest" && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
