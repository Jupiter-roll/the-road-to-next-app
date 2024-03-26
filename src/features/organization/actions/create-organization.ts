'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  FormState,
  fromErrorToFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';

const createOrganizationSchema = z.object({
  name: z.string().min(1).max(191),
});

export const createOrganization = async (
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getCurrentAuthOrRedirect({
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const data = createOrganizationSchema.parse({
      name: formData.get('name'),
    });

    const organization = await prisma.organization.create({
      data: {
        ...data,
        memberships: {
          create: {
            userId: user.id,
            membershipRole: 'ADMIN',
          },
        },
      },
    });

    await prisma.user.update({
      data: {
        activeOrganizationId: organization.id,
      },
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  setCookieByKey('toast', 'Organization created');
  redirect(ticketsPath());
};
