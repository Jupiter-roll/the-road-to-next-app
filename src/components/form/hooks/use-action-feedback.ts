import { useEffect, useRef } from "react";
import { FormState } from "@/components/form/utils/to-form-state";

type OnArgs = {
  formState: FormState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  formState: FormState,
  options?: UseActionFeedbackOptions
) => {
  const prevUpdate = useRef(formState.timestamp);
  const isUpdate = formState.timestamp !== prevUpdate.current;

  useEffect(() => {
    if (isUpdate) {
      if (options?.onSuccess && formState.status === "SUCCESS") {
        options.onSuccess({
          formState,
        });
      }

      if (options?.onError && formState.status === "ERROR") {
        options.onError({
          formState,
        });
      }

      prevUpdate.current = formState.timestamp;
    }
  }, [isUpdate, formState, options]);
};

export { useActionFeedback };
