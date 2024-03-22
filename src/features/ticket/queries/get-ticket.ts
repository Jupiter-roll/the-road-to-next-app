import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

export const getTicket = async (id: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return {
    ...ticket,
    isOwner: isOwner(user, ticket),
  };
};
