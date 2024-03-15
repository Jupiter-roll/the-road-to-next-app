'use client';

import { useState, cloneElement, useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  EMPTY_FORM_STATE,
  FormState,
} from '@/components/form/utils/to-form-state';
import { Button } from './ui/button';
import { useFormFeedback } from './form/hooks/use-form-feedback';

type useConfirmDialogArgs = {
  action: () => Promise<FormState>;
  trigger:
    | React.ReactElement
    | ((isLoading: boolean) => React.ReactElement);
  onSuccess?: () => void;
};

const useConfirmDialog = ({
  action,
  trigger,
  onSuccess,
}: useConfirmDialogArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formState, formAction] = useFormState(
    action,
    EMPTY_FORM_STATE
  );

  const toastRef = useRef<string | number | null>(null);

  useFormFeedback(formState, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
      onSuccess?.();
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
    onSettled: () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    },
  });

  const [isPending, startTransition] = useTransition();

  const dialogTriggerWithClickHandler = cloneElement(
    typeof trigger === 'function' ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen((state) => !state),
    }
  );

  const handleAction = () => {
    toastRef.current = toast.loading('Deleting ...');

    startTransition(() => {
      formAction();
    });
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Make sure you understand the
            consequences.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={handleAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTriggerWithClickHandler, dialog] as const;
};

export { useConfirmDialog };
