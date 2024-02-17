import { FormState } from '@/utils/transform-error';
import { toast } from 'sonner';
import { useRef, useEffect } from 'react';

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  useEffect(() => {
    const showToast =
      formState.message &&
      formState.timestamp !== prevTimestamp.current;

    if (showToast) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState.status, formState.message, formState.timestamp]);
};

export { useToastMessage };
