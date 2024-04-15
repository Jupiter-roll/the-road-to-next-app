'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { signUp } from '../actions/sign-up';

const SignUpForm = () => {
  return (
    <Form action={signUp}>
      {(formState) => (
        <>
          <Input name="username" placeholder="Username" />
          <FieldError formState={formState} name="username" />

          <Input name="email" placeholder="Email" />
          <FieldError formState={formState} name="email" />

          <Input
            type="password"
            name="password"
            placeholder="Password"
          />
          <FieldError formState={formState} name="password" />

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <FieldError formState={formState} name="confirmPassword" />

          <SubmitButton label="Sign Up" />
        </>
      )}
    </Form>
  );
};

export { SignUpForm };
