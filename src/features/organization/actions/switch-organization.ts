'use server';

import { revalidatePath } from 'next/cache';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { organizationsPath } from '@/paths';

export const switchOrganization = async (organizationId: string) => {
  const { user } = await getCurrentAuthOrRedirect({
    checkActiveOrganization: false,
  });

  try {
    await prisma.user.update({
      data: {
        activeOrganizationId: organizationId,
      },
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(organizationsPath());

  return toFormState(
    'SUCCESS',
    'Active organization has been switched'
  );
};
