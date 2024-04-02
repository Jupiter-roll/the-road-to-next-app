'use server';

import { revalidatePath } from 'next/cache';
import { setCookieByKey } from '@/actions/cookies';
import { toFormState } from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';

export const deleteInvitation = async (email: string) => {
  const invitation = await prisma.invitation.findUnique({
    where: {
      email,
    },
  });

  if (!invitation) {
    return toFormState('ERROR', 'Invitation not found');
  }

  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: invitation.organizationId,
  });

  await prisma.invitation.delete({
    where: {
      email,
    },
  });

  revalidatePath(organizationsPath());

  setCookieByKey('toast', 'The invitation has been deleted');
};
