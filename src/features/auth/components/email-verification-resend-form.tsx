'use client';

import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { resendVerificationEmail } from '../actions/resend-verification-email';

const EmailVerificationResendForm = () => {
  return (
    <Form action={resendVerificationEmail}>
      {() => <SubmitButton label="Resend Code" variant="ghost" />}
    </Form>
  );
};

export { EmailVerificationResendForm };
