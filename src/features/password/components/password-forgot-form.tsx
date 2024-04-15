'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { passwordForgot } from '../actions/password-forgot';

const PasswordForgotForm = () => {
  return (
    <Form action={passwordForgot}>
      {(formState) => (
        <>
          <Input name="email" placeholder="Email" />
          <FieldError formState={formState} name="email" />

          <SubmitButton label="Send Email" />
        </>
      )}
    </Form>
  );
};

export { PasswordForgotForm };
