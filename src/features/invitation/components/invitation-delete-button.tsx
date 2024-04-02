'use client';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteInvitation } from '../actions/delete-invitation';

type InvitationDeleteButtonProps = {
  email: string;
};

const InvitationDeleteButton = ({
  email,
}: InvitationDeleteButtonProps) => {
  const deleteInvitationWithIds = deleteInvitation.bind(null, email);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteInvitationWithIds,
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="destructive" size="icon">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="destructive" size="icon">
          <TrashIcon className="w-4 h-4" />
        </Button>
      ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { InvitationDeleteButton };
