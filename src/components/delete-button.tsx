'use client';

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { EMPTY_FORM_STATE, FormState } from '@/utils/transform-error';
import { useFormState } from 'react-dom';
import { useToastMessage } from './form/use-toast-message';

type DeleteButtonProps = {
  action: () => Promise<FormState>;
  subject?: string;
  trigger: React.ReactNode;
};

const DeleteButton = ({
  action: myAction,
  subject = 'item',
  trigger,
}: DeleteButtonProps) => {
  const [formState, formAction] = useFormState(
    myAction,
    EMPTY_FORM_STATE
  );

  useToastMessage(formState);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            the {subject} from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction type="submit">
              Confirm
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteButton };
