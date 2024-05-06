'use server';

import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export const getMemberships = async (organizationId: string) => {
  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: organizationId,
  });

  return await prisma.membership.findMany({
    where: {
      organizationId,
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
