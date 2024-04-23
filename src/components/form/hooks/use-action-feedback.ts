import { useEffect, useRef } from "react";
import { FormState } from "@/components/form/utils/to-form-state";

type OnArgs<T> = {
  formState: FormState<T>;
  reset: () => void;
};

type UseActionFeedbackOptions<T> = {
  onSuccess?: (onArgs: OnArgs<T>) => void;
  onError?: (onArgs: OnArgs<T>) => void;
};

const useActionFeedback = <T = unknown>(
  formState: FormState<T>,
  options?: UseActionFeedbackOptions<T>
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
      if (options?.onSuccess && formState.status === "SUCCESS") {
        options.onSuccess({
          formState,
          reset: handleReset,
        });
      }

      if (options?.onError && formState.status === "ERROR") {
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

export { useActionFeedback };
