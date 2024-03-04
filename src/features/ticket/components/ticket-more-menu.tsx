'use client';

import Link from 'next/link';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { ticketEditPath } from '@/paths';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteButton } from '@/components/use-delete-button';
import { deleteTicket } from '../actions/delete-ticket';
import { Ticket, TicketStatus } from '@prisma/client';
import { TICKET_STATUS_TO_LABEL } from '../constants';
import { updateTicketStatus } from '../actions/update-ticket-status';
import { toast } from 'sonner';
import { useRef } from 'react';

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const deleteTicketAction = deleteTicket.bind(null, ticket.id);

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

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(
      ticket.id,
      value as TicketStatus
    );

    toast.promise(promise, {
      loading: 'Updating status...',
    });

    const result = await promise;

    if (result.status === 'ERROR') {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  return (
    <>
      {deleteDialog}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuItem asChild>
            <Link href={ticketEditPath(ticket.id)}>
              <PencilIcon className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>

          {deleteTrigger}

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={ticket.status}
            onValueChange={handleUpdateTicketStatus}
          >
            {(
              Object.keys(
                TICKET_STATUS_TO_LABEL
              ) as Array<TicketStatus>
            ).map((key) => (
              <DropdownMenuRadioItem key={key} value={key}>
                {TICKET_STATUS_TO_LABEL[key]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
