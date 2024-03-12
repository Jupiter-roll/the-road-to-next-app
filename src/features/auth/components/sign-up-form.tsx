'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { signUp } from '../actions/sign-up';

const SignUpForm = () => {
  const [formState, action] = useFormState(signUp, EMPTY_FORM_STATE);

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} ref={ref} className="flex flex-col gap-y-2">
      <Input name="username" placeholder="Username" />
      <FieldError formState={formState} name="username" />

      <Input name="email" placeholder="Email" />
      <FieldError formState={formState} name="email" />

      <Input type="password" name="password" placeholder="Password" />
      <FieldError formState={formState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <FieldError formState={formState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </form>
  );
};

export { SignUpForm };
