'use server';

import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export const getMemberships = async () => {
  const { user } = await getCurrentAuthOrRedirect();

  return await prisma.membership.findMany({
    where: {
      organizationId: user.activeOrganizationId,
    },
    include: {
      user: {
        select: {
          email: true,
          username: true,
          emailVerified: true,
        },
      },
    },
  });
};
