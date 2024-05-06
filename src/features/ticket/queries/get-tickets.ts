import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { prisma } from '@/lib/prisma';
import { ParsedSearchParams } from '../search-params';

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams
) => {
  const { user } = await getAuth();

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
    }),
    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    list: tickets.map((ticket) => {
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
    }),
    metadata: {
      count,
      hasNextPage: count > skip + take,
    },
  };
};
