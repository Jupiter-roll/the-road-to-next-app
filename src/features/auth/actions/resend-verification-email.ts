'use server';

import {
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { inngest } from '@/lib/inngest';
import { getCurrentAuthOrRedirect } from '../queries/get-current-auth-or-redirect';
import {
  canResendVerificationEmail,
  generateEmailVerificationCode,
} from '../services/email-verification';

export const resendVerificationEmail = async () => {
  const { user } = await getCurrentAuthOrRedirect();

  try {
    const canResend = await canResendVerificationEmail(user.id);
    if (!canResend) {
      return toFormState(
        'ERROR',
        'You can only resend the verification email once every minute.'
      );
    }

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email
    );

    await inngest.send({
      name: 'app/auth.email-verification',
      data: {
        username: user.username,
        email: user.email,
        verificationCode,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  return toFormState('SUCCESS', 'Verification email has been sent.');
};
