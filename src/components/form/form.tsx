import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { FormState } from "./utils/to-form-state";

type FormProps<T> = {
  action: (payload: FormData) => void;
  formState: FormState<T>;
  children: React.ReactNode;
  onSuccess?: (formState: FormState<T>) => void;
  onError?: (formState: FormState<T>) => void;
};

const Form = <T = unknown,>({
  action,
  formState,
  children,
  onSuccess,
  onError,
}: FormProps<T>) => {
  const { ref } = useActionFeedback<T>(formState, {
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
    <form ref={ref} action={action} className="flex flex-col gap-y-2">
      {children}

      <noscript>
        {formState.status === "ERROR" && (
          <div style={{ color: "red" }}>{formState.message}</div>
        )}

        {formState.status === "SUCCESS" && (
          <div style={{ color: "green" }}>{formState.message}</div>
        )}
      </noscript>
    </form>
  );
};

export { Form };
