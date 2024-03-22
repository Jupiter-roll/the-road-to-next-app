'use server';

import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { prisma } from '@/lib/prisma';
import { passwordResetPath } from '@/paths';
import { getBaseUrl } from '@/utils/url';
import { createPasswordResetToken } from '../services/password';

const passwordForgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
});

export const passwordForgot = async (
  _formState: FormState,
  formData: FormData
) => {
  try {
    const { email } = passwordForgotSchema.parse({
      email: formData.get('email'),
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toFormState('ERROR', 'Incorrect email');
    }

    const pageUrl = getBaseUrl() + passwordResetPath();
    const verificationToken = await createPasswordResetToken(user.id);
    const verificationLink = pageUrl + `/${verificationToken}`;

    // TODO when we have email setup
    // await sendEmailPasswordReset(email, verificationLink);
    // instead we will just print it to the console for now
    console.log(verificationLink); // TODO remove eventually
  } catch (error) {
    return fromErrorToFormState(error);
  }

  return toFormState('SUCCESS', 'Check your email for a reset link');
};
