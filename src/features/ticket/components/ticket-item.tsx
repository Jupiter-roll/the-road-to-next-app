import { Card } from '@/components/ui/card';
import { ticketPath } from '@/paths';
import clsx from 'clsx';
import {
  ArrowUpRightFromSquareIcon,
  CheckCircleIcon,
  FileTextIcon,
  PencilIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getTicket } from '../queries/get-ticket';
import { getTickets } from '../queries/get-tickets';
import { toCurrencyFromCent } from '@/lib/big';

const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  DONE: <CheckCircleIcon />,
  IN_PROGRESS: <PencilIcon />,
};

type TicketItemProps = {
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  isDetail?: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  if (!ticket) return null;

  return (
    <div className="flex gap-x-1">
      <Card
        key={ticket.id}
        className="flex-1 min-w-0 p-4 flex gap-x-4"
      >
        <div>{TICKET_ICONS[ticket.status]}</div>
        <div className="min-w-0 flex-1 flex flex-col gap-y-1">
          <h2 className="text-lg text-slate-100 font-semibold truncate">
            {ticket.title}
          </h2>

          {isDetail ? (
            <p
              className={clsx('text-sm text-slate-400 truncate', {
                'line-through': ticket.status === 'DONE',
              })}
            >
              {ticket.content}
            </p>
          ) : null}

          <div className="flex-1 flex justify-between">
            <p className="text-sm text-slate-400">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
            <p className="text-sm text-slate-400">
              {ticket.deadline}
            </p>
          </div>
        </div>
      </Card>

      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">
          <Button variant="outline" size="icon" asChild>
            <Link href={ticketPath(ticket.id)}>
              <ArrowUpRightFromSquareIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export { TicketItem };
