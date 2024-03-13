import Link from 'next/link';
import clsx from 'clsx';
import { Prisma } from '@prisma/client';
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  ArrowUpRightFromSquareIcon,
  MoreVerticalIcon,
  PencilIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toCurrencyFromCent } from '@/utils/currency';
import { ticketEditPath, ticketPath } from '@/paths';
import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { Comments } from '@/features/comment/components/comments';
import { TICKET_ICONS } from '../constants';
import { TicketMoreMenu } from './ticket-more-menu';

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: { username: true };
      };
    };
  }>;
  isDetail?: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getAuth();

  const isTicketOwner = isOwner(user, ticket);

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

      {isDetail ? <Comments ticketId={ticket.id} /> : null}
    </div>
  );
};

export { TicketItem };
