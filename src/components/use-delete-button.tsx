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
import { FormState } from '@/components/form/utils/to-form-state';
import { Button } from './ui/button';
import React, { useState } from 'react';

type useDeleteButtonProps = {
  action: () => Promise<FormState>;
  subject?: string;
  trigger: React.ReactElement;
};

const useDeleteButton = ({
  action,
  subject = 'item',
  trigger,
}: useDeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerWithClickHandler = React.cloneElement(
    trigger as React.ReactElement,
    {
      onClick: () => {
        setIsOpen((state) => !state);
      },
    }
  );

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> */}
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
          <AlertDialogAction asChild>
            <form action={action}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [triggerWithClickHandler, dialog] as const;
};

export { useDeleteButton };
