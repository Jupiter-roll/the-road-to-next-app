'use client';

import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/form/submit-button';
import { useFormState } from 'react-dom';
import { EMPTY_FORM_STATE } from '@/utils/transform-error';
import { FieldError } from '@/components/form/field-error';
import { useToastMessage } from '@/components/form/use-toast-message';
import { useFormReset } from '@/components/form/use-form-reset';
import { signIn } from '../actions/sign-in';

const SignInForm = () => {
  const [formState, action] = useFormState(signIn, EMPTY_FORM_STATE);

  const formRef = useFormReset(formState);
  useToastMessage(formState);

  return (
    <form
      action={action}
      ref={formRef}
      className="flex flex-col gap-y-2"
    >
      <div>
        <Input name="username" placeholder="Username" />
        <FieldError formState={formState} name="username" />
      </div>

      <div>
        <Input
          type="password"
          name="password"
          placeholder="Password"
        />
        <FieldError formState={formState} name="password" />
      </div>

      <SubmitButton label="Sign In" />
    </form>
  );
};

export { SignInForm };
