'use server';

import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export const getOrganizations = async () => {
  const { user } = await getCurrentAuthOrRedirect({
    checkActiveOrganization: false,
  });

  return await prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
  });
};
