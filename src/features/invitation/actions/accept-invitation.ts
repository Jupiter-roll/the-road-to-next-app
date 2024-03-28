'use server';

import { redirect } from 'next/navigation';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { setCookieByKey } from '@/actions/cookies';
import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { prisma } from '@/lib/prisma';
import { signInPath } from '@/paths';

export const acceptInvitation = async (invitationToken: string) => {
  console.log(invitationToken);

  try {
    const tokenHash = encodeHex(
      await sha256(new TextEncoder().encode(invitationToken))
    );

    const invitation = await prisma.invitation.findUnique({
      where: {
        tokenHash,
      },
    });

    if (!invitation) {
      // invalid token (or removed invitation)
      return toFormState('ERROR', 'Invalid invitation');
    }

    const user = await prisma.user.findUnique({
      where: {
        email: invitation.email,
      },
    });

    if (user) {
      await prisma.invitation.delete({
        where: {
          tokenHash,
        },
      });

      await prisma.membership.create({
        data: {
          organizationId: invitation.organizationId,
          userId: user.id,
          membershipRole: 'MEMBER',
        },
      });
    } else {
      await prisma.invitation.update({
        where: {
          tokenHash,
        },
        data: {
          status: 'ACCEPTED_WITHOUT_ACCOUNT',
        },
      });
    }
  } catch (error) {
    return fromErrorToFormState(error);
  }

  setCookieByKey('toast', 'Invitation accepted');
  redirect(signInPath());
};
