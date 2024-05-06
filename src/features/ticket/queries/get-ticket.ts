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
      organization: {
        include: {
          memberships: {
            where: {
              userId: user?.id,
            },
          },
        },
      },
    },
  });

  const owner = isOwner(user, ticket);
  const myMaybeMembership = ticket.organization.memberships[0];
  const canDeleteTicket = !!myMaybeMembership?.canDeleteTicket;

  return {
    ...ticket,
    isOwner: owner,
    permissions: {
      canDeleteTicket: owner && canDeleteTicket,
    },
  };
};
