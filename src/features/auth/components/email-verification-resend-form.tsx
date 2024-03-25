'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { resendVerificationEmail } from '../actions/resend-verification-email';

const EmailVerificationResendForm = () => {
  const [formState, action] = useFormState(
    resendVerificationEmail,
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState }) => {
      if (formState.message) {
        toast.success(formState.message);
      }
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} ref={ref} className="flex flex-col gap-y-2">
      <SubmitButton label="Resend Code" variant="ghost" />
    </form>
  );
};

export { EmailVerificationResendForm };
