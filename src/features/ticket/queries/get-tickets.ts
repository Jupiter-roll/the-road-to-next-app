import { prisma } from '@/services/prisma';
import { ParsedSearchParams } from '../search-params';

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
      [searchParams.sortKey]: searchParams.sortValue,
    },
  });
};
