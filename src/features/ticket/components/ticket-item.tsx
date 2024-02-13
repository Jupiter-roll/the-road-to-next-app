import clsx from 'clsx';
import { Card } from '@/components/ui/card';
import { Ticket } from '../type';
import {
  FileTextIcon,
  CheckCircleIcon,
  PencilIcon,
} from 'lucide-react';

const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  DONE: <CheckCircleIcon />,
  IN_PROGRESS: <PencilIcon />,
};

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card className="text-slate-100 p-4 flex gap-x-4">
      <div>{TICKET_ICONS[ticket.status]}</div>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold truncate">
          {ticket.name}
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
  );
};

export { TicketItem };
