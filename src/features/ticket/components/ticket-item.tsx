import clsx from 'clsx';

import { Ticket, TicketStatus } from '../type';
import { TicketItemDropdown } from './ticket-item-dropdown';
import { Card } from '@/components/ui/card';
import {
  CheckCircleIcon,
  FileTextIcon,
  PencilIcon,
} from 'lucide-react';

const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  DONE: <CheckCircleIcon />,
  IN_PROGRESS: <PencilIcon />,
};

type TicketItemProps = {
  ticket: Ticket;
  onChangeTicketStatus: (
    id: string,
    ticketStatus: TicketStatus
  ) => void;
};

const TicketItem = ({
  ticket,
  onChangeTicketStatus,
}: TicketItemProps) => {
  const handleChangeTicketStatus = (value: TicketStatus) => {
    onChangeTicketStatus(ticket.id, value);
  };

  return (
    <Card className="flex text-slate-100 p-4 gap-x-4">
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
      <div className="ml-auto">
        <TicketItemDropdown
          ticket={ticket}
          onChangeTicketStatus={handleChangeTicketStatus}
        />
      </div>
    </Card>
  );
};

export { TicketItem };
