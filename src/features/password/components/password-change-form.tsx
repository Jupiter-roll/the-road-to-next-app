'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
import { passwordChange } from '../actions/password-change';

const PasswordChangeForm = () => {
  const [formState, action] = useFormState(
    passwordChange,
    EMPTY_FORM_STATE
  );

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
      <Input
        type="password"
        name="password"
        placeholder="Current Password"
      />
      <FieldError formState={formState} name="password" />

      <SubmitButton label="Send Email" />
    </form>
  );
};

export { PasswordChangeForm };
