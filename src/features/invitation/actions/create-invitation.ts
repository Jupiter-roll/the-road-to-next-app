'use server';

import { generateId } from 'lucia';
import { revalidatePath } from 'next/cache';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { getStripeProvisioningByOrganization } from '@/features/stripe/queries/get-stripe-provisioning';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { emailInvitationPath, membershipsPath } from '@/paths';
import { getBaseUrl } from '@/utils/url';

const createInvitationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
});

export const createInvitation = async (
  organizationId: string,
  _formState: FormState,
  formData: FormData
) => {
  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: organizationId,
  });

  const { allowedMembers, currentMembers } =
    await getStripeProvisioningByOrganization(organizationId);

  if (allowedMembers <= currentMembers) {
    return toFormState(
      'ERROR',
      'Upgrade your subscription to invite more members'
    );
  }

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get('email'),
    });

    const alreadyMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (alreadyMembership) {
      return toFormState(
        'ERROR',
        'User is already a member of this organization'
      );
    }

    await prisma.invitation.deleteMany({
      where: {
        email,
      },
    });

    const tokenId = generateId(40);
    const tokenHash = encodeHex(
      await sha256(new TextEncoder().encode(tokenId))
    );

    await prisma.invitation.create({
      data: {
        tokenHash,
        email,
        organizationId,
      },
    });

    const pageUrl = getBaseUrl() + emailInvitationPath();
    const emailInvitationLink = pageUrl + `/${tokenId}`;

    await inngest.send({
      name: 'app/invitation.created',
      data: {
        organizationId,
        email,
        emailInvitationLink,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(membershipsPath(organizationId));

  return toFormState('SUCCESS', 'User invited to organization');
};
