import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowUpRightFromSquareIcon,
  CheckCircleIcon,
  FileTextIcon,
  GripHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Ticket } from '@prisma/client';
import { displayCurrency } from '@/utils/currency';
import { getAuth } from '@/features/auth/queries/get-auth';
import { Comments } from '@/features/comment/components/comments';
import { deleteTicket } from '../actions/delete-ticket';
import { DeleteButton } from '@/components/delete-button';
import { TicketDeleteButton } from './ticket-delete-button';

const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  DONE: <CheckCircleIcon />,
  IN_PROGRESS: <PencilIcon />,
};

type TicketItemProps = {
  ticket: Ticket;
  isDetail: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getAuth();
  const deleteTicketAction = deleteTicket.bind(null, ticket.id);

  const isTicketByUser = user?.id === ticket.userId;

  return (
    <div className="flex flex-col gap-y-8 animate-fade-in-from-top">
      <div className="flex gap-x-1">
        <Card className="min-w-0 text-slate-100 p-4 flex-1 flex gap-x-4">
          <div>{TICKET_ICONS[ticket.status]}</div>
          <div className="min-w-0 flex-1 flex flex-col gap-y-1">
            <h2 className="text-lg font-semibold truncate">
              {ticket.title}
            </h2>

            {isDetail ? (
              <p className="text-sm text-slate-400">
                {ticket.content}
              </p>
            ) : null}

            <div className="flex-1 flex justify-between">
              <p className="text-sm text-slate-400">
                {displayCurrency(ticket.bounty)}
              </p>
              <p className="text-sm text-slate-400">
                {ticket.deadline}
              </p>
            </div>
          </div>
        </Card>

        {isDetail ? (
          <div className="flex flex-col gap-y-1">
            {isTicketByUser && (
              <Button variant="outline" size="icon" asChild>
                <Link href={`/tickets/${ticket.id}/edit`}>
                  <PencilIcon className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {isTicketByUser && <TicketDeleteButton id={ticket.id} />}
          </div>
        ) : (
          <div className="flex flex-col gap-y-1">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/tickets/${ticket.id}`}>
                <ArrowUpRightFromSquareIcon className="h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" size="icon">
              <GripHorizontalIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isDetail ? <Comments ticketId={ticket.id} /> : null}
    </div>
  );
};

export { TicketItem };
