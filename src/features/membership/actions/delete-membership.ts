'use server';

import { revalidatePath } from 'next/cache';
import { setCookieByKey } from '@/actions/cookies';
import { toFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';
import { getMemberships } from '../queries/get-memberships';

export const deleteMembership = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const { user } = await getCurrentAuthOrRedirect();
  const memberships = await getMemberships(organizationId);

  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership) {
    return toFormState(
      'ERROR',
      'You cannot delete the last membership of an organization'
    );
  }

  const targetMembership = memberships?.find(
    (membership) => membership.userId === userId
  );

  const adminMemberships = memberships?.filter(
    (membership) => membership.membershipRole === 'ADMIN'
  );

  const removesAdmin = targetMembership?.membershipRole === 'ADMIN';
  const isLastAdmin = (adminMemberships ?? []).length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toFormState('ERROR', 'You must have at least one admin');
  }

  const myMembership = memberships?.find(
    (membership) => membership.userId === user?.id
  );

  const isMyself = user.id === userId;
  const isAdmin = myMembership?.membershipRole === 'ADMIN';

  if (!isMyself && !isAdmin) {
    return toFormState(
      'ERROR',
      isMyself
        ? 'You can only delete your own membership'
        : 'You can only delete memberships as an admin'
    );
  }

  await prisma.membership.delete({
    where: {
      organizationId_userId: {
        userId,
        organizationId,
      },
    },
  });

  await prisma.user.updateMany({
    where: {
      activeOrganizationId: organizationId,
    },
    data: {
      activeOrganizationId: null,
    },
  });

  revalidatePath(organizationsPath());

  setCookieByKey(
    'toast',
    isMyself
      ? 'You have left the organization'
      : 'The membership has been deleted'
  );
};
