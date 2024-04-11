'use client';

import { cloneElement, useRef, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import {
  EMPTY_FORM_STATE,
  FormState,
} from '@/components/form/utils/to-form-state';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useFormFeedback } from './form/hooks/use-form-feedback';
import { Button } from './ui/button';

type useConfirmDialogArgs = {
  action: () => Promise<FormState | undefined>;
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

  useFormFeedback(formState ?? EMPTY_FORM_STATE, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
      console.log('asdqasdasd');
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
    onCleanup: () => {
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
