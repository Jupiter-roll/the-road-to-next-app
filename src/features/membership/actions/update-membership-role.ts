'use server';

import { MembershipRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { toFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';

export const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
}) => {
  const { user, organizations: myOrganizations } =
    await getCurrentAuthOrRedirect();

  const memberships = myOrganizations.find(
    (organization) => organization.id === organizationId
  )?.memberships;

  const membership = memberships?.find(
    (membership) => membership.userId === user?.id
  );

  const isAdmin = membership?.membershipRole === 'ADMIN';
  if (!isAdmin) {
    return toFormState(
      'ERROR',
      'You must be an admin to update roles'
    );
  }

  const adminMemberships = memberships?.filter(
    (membership) => membership.membershipRole === 'ADMIN'
  );

  const isLastAdmin = (adminMemberships ?? []).length <= 1;
  if (isLastAdmin) {
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
