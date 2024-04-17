import { useEffect, useRef } from "react";
import { FormState } from "@/components/form/utils/to-form-state";

type OnArgs = {
  formState: FormState;
  reset: () => void;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  formState: FormState,
  options?: UseActionFeedbackOptions
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
