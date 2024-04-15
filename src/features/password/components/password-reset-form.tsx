'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { passwordReset } from '../actions/password-reset';

type PasswordResetFormProps = {
  verificationToken: string;
};

const PasswordResetForm = ({
  verificationToken,
}: PasswordResetFormProps) => {
  return (
    <Form action={passwordReset.bind(null, verificationToken)}>
      {(formState) => (
        <>
          <Input
            type="password"
            name="password"
            placeholder="New Password"
          />
          <FieldError formState={formState} name="password" />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
          />
          <FieldError formState={formState} name="confirmPassword" />

          <SubmitButton label="Reset Password" />
        </>
      )}
    </Form>
  );
};

export { PasswordResetForm };
