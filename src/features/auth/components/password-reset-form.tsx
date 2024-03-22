'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
import { passwordReset } from '../actions/password-reset';

type PasswordResetFormProps = {
  verificationToken: string;
};

const PasswordResetForm = ({
  verificationToken,
}: PasswordResetFormProps) => {
  const [formState, action] = useFormState(
    passwordReset.bind(null, verificationToken),
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} ref={ref} className="flex flex-col gap-y-2">
      <Input type="password" name="password" placeholder="Password" />
      <FieldError formState={formState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <FieldError formState={formState} name="confirmPassword" />

      <SubmitButton label="Reset Password" />
    </form>
  );
};

export { PasswordResetForm };
