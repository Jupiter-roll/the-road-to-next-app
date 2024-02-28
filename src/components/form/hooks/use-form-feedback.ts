import { useRef, useEffect } from 'react';
import { FormState } from '@/components/form/utils/to-form-state';

type OnArgs = {
  formState: FormState;
  reset: () => void;
};

type UseFormFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useFormFeedback = (
  formState: FormState,
  options?: UseFormFeedbackOptions
) => {
  const ref = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    if (!ref.current) return;
    ref.current.reset();
  };

  const prevUpdate = useRef(formState.timestamp);
  const isUpdate = formState.timestamp !== prevUpdate.current;

  useEffect(() => {
    if (isUpdate) {
      if (options?.onSuccess && formState.status === 'SUCCESS') {
        options.onSuccess({
          formState,
          reset: handleReset,
        });
      }

      if (options?.onError && formState.status === 'ERROR') {
        options.onError({
          formState,
          reset: handleReset,
        });
      }

      prevUpdate.current = formState.timestamp;
    }
  }, [isUpdate, formState, options]);

  return { ref };
};

export { useFormFeedback };
