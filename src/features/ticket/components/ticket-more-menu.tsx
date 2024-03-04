'use client';

import Link from 'next/link';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { ticketEditPath } from '@/paths';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteButton } from '@/components/use-delete-button';
import { deleteTicket } from '../actions/delete-ticket';

type TicketMoreMenuProps = {
  id: string;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ id, trigger }: TicketMoreMenuProps) => {
  const deleteTicketAction = deleteTicket.bind(null, id);

  const [deleteTrigger, deleteDialog] = useDeleteButton({
    action: deleteTicketAction,
    subject: 'ticket',
    trigger: (
      <DropdownMenuItem>
        <TrashIcon className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  return (
    <>
      {deleteDialog}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <Link href={ticketEditPath(id)}>
            <DropdownMenuItem>
              <PencilIcon className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>

          {deleteTrigger}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
