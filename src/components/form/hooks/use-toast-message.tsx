import { useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { FormState } from '@/components/form/utils/to-form-state';

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message &&
    formState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState, showToast]);

  // stay usable without JS
  return (
    <noscript>
      {formState.status === 'ERROR' && (
        <div className="text-red-500">{formState.message}</div>
      )}

      {formState.status === 'SUCCESS' && (
        <div className="text-green-500">{formState.message}</div>
      )}
    </noscript>
  );
};

export { useToastMessage };
