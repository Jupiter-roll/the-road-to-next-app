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
} from '@/components/ui/alert-dialog';
import { FormState } from '@/components/form/utils/to-form-state';
import { Button } from './ui/button';
import { useState, cloneElement } from 'react';

type useConfirmDialogArgs = {
  action: () => Promise<FormState>;
  trigger: React.ReactElement;
};

const useConfirmDialog = ({
  action,
  trigger,
}: useConfirmDialogArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTriggerWithClickHandler = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

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
            <form action={action}>
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
