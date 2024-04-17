import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import { FormState } from "./utils/to-form-state";

type FormProps = {
  action: (payload: FormData) => void;
  formState: FormState;
  children: React.ReactNode;
};

const Form = ({ action, formState, children }: FormProps) => {
  const { ref } = useActionFeedback(formState, {
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
