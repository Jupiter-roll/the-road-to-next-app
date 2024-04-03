'use server';

import { MembershipRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { toFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';
import { getMemberships } from '../queries/get-memberships';

export const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
}) => {
  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: organizationId,
  });

  const memberships = await getMemberships(organizationId);

  const adminMemberships = memberships.filter(
    (membership) => membership.membershipRole === 'ADMIN'
  );

  const removesAdmin = membershipRole !== 'ADMIN';
  const isLastAdmin = (adminMemberships ?? []).length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toFormState('ERROR', 'You must have at least one admin');
  }

  await prisma.membership.update({
    where: {
      organizationId_userId: {
        userId,
        organizationId,
      },
    },
    data: {
      membershipRole,
    },
  });

  revalidatePath(organizationsPath());

  return toFormState('SUCCESS', 'The role has been updated');
};
