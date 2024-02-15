import { FormState } from '@/utils/transform-error';
import { useToast } from '../ui/use-toast';
import { useRef, useEffect } from 'react';

const useToastMessage = (formState: FormState) => {
  const { toast } = useToast();

  const prevTimestamp = useRef(formState.timestamp);

  useEffect(() => {
    if (
      formState.message &&
      formState.timestamp !== prevTimestamp.current
    ) {
      toast({
        description: formState.message,
        variant:
          formState.status === 'ERROR' ? 'destructive' : 'default',
      });

      prevTimestamp.current = formState.timestamp;
    }
  }, [
    formState.status,
    formState.message,
    toast,
    formState.timestamp,
  ]);
};

export { useToastMessage };
