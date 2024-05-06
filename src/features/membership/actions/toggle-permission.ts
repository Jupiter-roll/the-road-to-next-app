'use server';

import { revalidatePath } from 'next/cache';
import { toFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { membershipsPath } from '@/paths';

export const togglePermission = async ({
  userId,
  organizationId,
  permissionKey,
}: {
  userId: string;
  organizationId: string;
  permissionKey: 'canDeleteTicket';
}) => {
  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: organizationId,
  });

  const membership = await prisma.membership.findUnique({
    where: {
      organizationId_userId: {
        userId,
        organizationId,
      },
    },
  });

  if (!membership) {
    return toFormState('ERROR', 'Membership not found');
  }

  await prisma.membership.update({
    where: {
      organizationId_userId: {
        userId,
        organizationId,
      },
    },
    data: {
      [permissionKey]:
        membership[permissionKey] === true ? false : true,
    },
  });

  revalidatePath(membershipsPath(organizationId));

  return toFormState('SUCCESS', 'Permission updated');
};
