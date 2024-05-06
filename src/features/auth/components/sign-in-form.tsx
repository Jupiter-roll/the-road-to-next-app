'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { signIn } from '../actions/sign-in';

const SignInForm = () => {
  return (
    <Form action={signIn}>
      {(formState) => (
        <>
          <Input name="email" placeholder="Email" />
          <FieldError formState={formState} name="email" />

          <Input
            type="password"
            name="password"
            placeholder="Password"
          />
          <FieldError formState={formState} name="password" />

          <SubmitButton label="Sign In" />
        </>
      )}
    </Form>
  );
};

export { SignInForm };
