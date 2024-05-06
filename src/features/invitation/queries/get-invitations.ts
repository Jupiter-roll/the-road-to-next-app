'use server';

import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';

export const getInvitations = async (organizationId: string) => {
  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: organizationId,
  });

  return await prisma.invitation.findMany({
    where: {
      organizationId,
    },
    select: {
      email: true,
    },
  });
};
