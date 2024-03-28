'use server';

import { revalidatePath } from 'next/cache';
import { setCookieByKey } from '@/actions/cookies';
import { toFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';

export const deleteMembership = async ({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) => {
  const { user, organizations: myOrganizations } =
    await getCurrentAuthOrRedirect();

  const memberships = myOrganizations.find(
    (organization) => organization.id === organizationId
  )?.memberships;

  const membership = memberships?.find(
    (membership) => membership.userId === user?.id
  );

  const isLastMembership = (memberships ?? []).length <= 1;
  if (isLastMembership) {
    return toFormState(
      'ERROR',
      'You cannot delete the last membership of an organization'
    );
  }

  const isMyself = user.id === userId;
  const isAdmin = membership?.membershipRole === 'ADMIN';

  if (isMyself || isAdmin) {
    await prisma.membership.delete({
      where: {
        organizationId_userId: {
          userId,
          organizationId,
        },
      },
    });

    revalidatePath(organizationsPath());

    setCookieByKey(
      'toast',
      isMyself
        ? 'You have left the organization'
        : 'The membership has been deleted'
    );
  } else {
    return toFormState(
      'ERROR',
      isMyself
        ? 'You can only delete your own membership'
        : 'You can only delete memberships as an admin'
    );
  }
};
