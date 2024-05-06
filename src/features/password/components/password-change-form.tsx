'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { passwordChange } from '../actions/password-change';

const PasswordChangeForm = () => {
  return (
    <Form action={passwordChange}>
      {(formState) => (
        <>
          <Input
            type="password"
            name="password"
            placeholder="Current Password"
          />
          <FieldError formState={formState} name="password" />

          <SubmitButton label="Send Email" />
        </>
      )}
    </Form>
  );
};

export { PasswordChangeForm };
