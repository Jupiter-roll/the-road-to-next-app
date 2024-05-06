'use client';

import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteMembership } from '../actions/delete-membership';

type MembershipDeleteButtonProps = {
  userId: string;
  organizationId: string;
};

const MembershipDeleteButton = ({
  userId,
  organizationId,
}: MembershipDeleteButtonProps) => {
  const deleteMembershipWithIds = deleteMembership.bind(null, {
    userId,
    organizationId,
  });

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteMembershipWithIds,
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="destructive" size="icon">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="destructive" size="icon">
          <LogOutIcon className="w-4 h-4" />
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

export { MembershipDeleteButton };
