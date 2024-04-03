import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';

export const getTicket = async (id: string) => {
  const { user, organizations } = await getAuth();

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

  const organization = organizations.find(
    (organization) => organization.id === ticket.organizationId
  );

  const membership = organization?.memberships.find(
    (membership) => membership.userId === user?.id
  );

  const owner = isOwner(user, ticket);
  const canDeleteTicket = owner && !!membership?.canDeleteTicket;

  return {
    ...ticket,
    isOwner: owner,
    permissions: {
      canDeleteTicket,
    },
  };
};
