import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import clsx from 'clsx';
import {
  ArrowUpRightFromSquareIcon,
  CheckCircleIcon,
  FileTextIcon,
  GripHorizontalIcon,
  PencilIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Ticket } from '../type';

const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  DONE: <CheckCircleIcon />,
  IN_PROGRESS: <PencilIcon />,
};

type TicketItemProps = {
  ticket: Ticket;
  isDetail: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  return (
    <div className="flex gap-x-1 animate-fade-in-from-top">
      <Card className="min-w-0 text-slate-100 p-4 flex-1 flex gap-x-4">
        <div>{TICKET_ICONS[ticket.status]}</div>
        <div className="min-w-0 flex flex-col gap-y-1">
          <h2 className="text-lg font-semibold truncate">
            {ticket.title}
          </h2>
          <p
            className={clsx('text-sm truncate', {
              'line-through': ticket.status === 'DONE',
            })}
          >
            {ticket.content}
          </p>
        </div>
      </Card>

      {isDetail ? null : (
        <div className="flex flex-col justify-between">
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
  );
};

export { TicketItem };
