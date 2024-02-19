import { prisma } from '@/services/prisma';
import { SerliazedSearchParams } from '../search-params';

export const getTickets = async (
  userId: string | undefined,
  searchParams: SerliazedSearchParams
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
      },
    },
    orderBy: {
      ...(searchParams.sort === 'newest' && { createdAt: 'desc' }),
      ...(searchParams.sort === 'bounty' && { bounty: 'desc' }),
    },
  });
};
