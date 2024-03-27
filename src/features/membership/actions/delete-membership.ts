'use server';

import { revalidatePath } from 'next/cache';
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

  const membership = myOrganizations
    .find((v) => v.id === organizationId)
    ?.memberships.find((v) => v.userId === user?.id);

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

    return toFormState(
      'SUCCESS',
      isMyself
        ? 'You have left the organization'
        : 'The membership has been deleted'
    );
  }

  return toFormState(
    'ERROR',
    isMyself
      ? 'You can only delete your own membership'
      : 'You can only delete memberships as an admin'
  );
};
