import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowUpRightFromSquareIcon,
  CheckCircleIcon,
  FileTextIcon,
  GripHorizontalIcon,
  PencilIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Ticket } from '@prisma/client';
import { displayCurrency } from '@/utils/currency';

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
        <div className="min-w-0 flex-1 flex flex-col gap-y-1">
          <h2 className="text-lg font-semibold truncate">
            {ticket.title}
          </h2>
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
