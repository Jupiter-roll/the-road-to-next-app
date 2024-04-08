import clsx from 'clsx';
import {
  ArrowUpRightFromSquareIcon,
  MoreVerticalIcon,
  PencilIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ticketEditPath, ticketPath } from '@/paths';
import { toCurrencyFromCent } from '@/utils/currency';
import { TICKET_ICONS } from '../constants';
import { TicketWithMetadata } from '../types';
import { TicketMoreMenu } from './ticket-more-menu';

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
  attachments?: React.ReactNode;
};

const TicketItem = ({
  ticket,
  isDetail,
  comments,
  attachments,
}: TicketItemProps) => {
  const isTicketOwner = ticket.isOwner;

  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)}>
        <ArrowUpRightFromSquareIcon className="w-4 h-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketEditPath(ticket.id)}>
        <PencilIcon className="w-4 h-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div className="space-y-4">
      <div
        className={clsx('flex gap-x-1', {
          'w-[580px]': isDetail,
          'w-[420px]': !isDetail,
        })}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate">{ticket.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx('whitespace-break-spaces', {
                'line-clamp-3': !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        {isDetail ? (
          <div className="flex flex-col gap-y-1">
            {editButton}
            {moreMenu}
          </div>
        ) : (
          <div className="flex flex-col gap-y-1">
            {detailButton}
            {editButton}
          </div>
        )}
      </div>
      {attachments}
      {comments}
    </div>
  );
};

export { TicketItem };
