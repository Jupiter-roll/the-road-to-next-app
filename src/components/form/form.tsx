import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useFormFeedback } from './hooks/use-form-feedback';
import { EMPTY_FORM_STATE, FormState } from './utils/to-form-state';

type FormProps = {
  action: (
    formState: FormState,
    formData: FormData
  ) => FormState | Promise<FormState>;
  onSuccess?: (formState: FormState) => void;
  onError?: (formState: FormState) => void;
  children: (formState: FormState) => React.ReactNode;
};

const Form = ({
  action,
  onSuccess,
  onError,
  children,
}: FormProps) => {
  const [formState, formAction] = useFormState(
    action,
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
      onSuccess?.(formState);
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }

      onError?.(formState);
    },
  });

  return (
    <form
      ref={ref}
      action={formAction}
      className="flex flex-col gap-y-2"
    >
      {children(formState)}

      <noscript>
        {formState.status === 'ERROR' && (
          <div style={{ color: 'red' }}>{formState.message}</div>
        )}

        {formState.status === 'SUCCESS' && (
          <div style={{ color: 'green' }}>{formState.message}</div>
        )}
      </noscript>
    </form>
  );
};

export { Form };
