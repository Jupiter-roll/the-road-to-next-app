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
import { prisma } from '@/lib/prisma';
import { membershipsPath } from '@/paths';

const createInvitationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
});

export const createInvitation = async (
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getCurrentAuthOrRedirect();

  const membership = await prisma.membership.findUnique({
    where: {
      organizationId_userId: {
        userId: user.id,
        organizationId: user.activeOrganizationId,
      },
    },
  });

  if (membership?.membershipRole !== 'ADMIN') {
    return toFormState(
      'ERROR',
      'You can only invite members as an admin'
    );
  }

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get('email'),
    });

    const invitation = await prisma.invitation.findUnique({
      where: {
        email,
      },
    });

    if (!invitation) {
      const tokenId = generateId(40);
      const tokenHash = encodeHex(
        await sha256(new TextEncoder().encode(tokenId))
      );

      await prisma.invitation.create({
        data: {
          email,
          tokenHash,
          organizationId: user.activeOrganizationId,
        },
      });
    }

    // await inngest.send({
    //   name: 'app/invitation.create',
    //   data: {
    //     username: user.username,
    //     email: user.email,
    //     passwordResetLink,
    //   },
    // });

    // TODO invite by email link to join organization
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(membershipsPath(user.activeOrganizationId));

  return toFormState('SUCCESS', 'User invited to organization');
};
