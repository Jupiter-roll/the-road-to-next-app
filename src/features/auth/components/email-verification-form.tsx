'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { verifyEmail } from '../actions/verify-email';

const EmailVerificationForm = () => {
  return (
    <Form action={verifyEmail}>
      {(formState) => (
        <>
          <Input type="code" name="code" placeholder="Code" />
          <FieldError formState={formState} name="code" />

          <SubmitButton label="Verify" />
        </>
      )}
    </Form>
  );
};

export { EmailVerificationForm };
