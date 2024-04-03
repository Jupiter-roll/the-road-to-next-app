import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';
import { ParsedSearchParams } from '../search-params';

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams
) => {
  const { user, organizations } = await getAuth();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
    },
    ...(byOrganization && user?.activeOrganizationId
      ? {
          organizationId: user.activeOrganizationId,
        }
      : {}),
  };

  const skip = searchParams.size * searchParams.page;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  const organization = organizations.find(
    (organization) => organization.id === user?.activeOrganizationId
  );

  const membership = organization?.memberships.find(
    (membership) => membership.userId === user?.id
  );

  return {
    list: tickets.map((ticket) => {
      const owner = isOwner(user, ticket);
      const canDeleteTicket = owner && !!membership?.canDeleteTicket;

      return {
        ...ticket,
        isOwner: owner,
        permissions: {
          canDeleteTicket,
        },
      };
    }),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
