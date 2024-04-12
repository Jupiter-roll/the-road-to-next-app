import { ArrowUpRightFromSquareIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ticketPath } from '@/paths';
import { getReferencedTickets } from '../queries/get-referenced-tickets';

type ReferencedTicketsProps = {
  ticketId: string;
};

const ReferencedTickets = async ({
  ticketId,
}: ReferencedTicketsProps) => {
  const referencedTickets = await getReferencedTickets(ticketId);

  if (!referencedTickets.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referenced Tickets</CardTitle>
        <CardDescription>
          Tickets that have been referenced in comments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-2 mb-4">
          {referencedTickets.map((referencedTicket) => (
            <div key={referencedTicket.id}>
              <Link
                className="flex gap-x-2 items-center text-sm"
                href={ticketPath(referencedTicket.id)}
              >
                <ArrowUpRightFromSquareIcon className="h-4 w-4" />
                {referencedTicket.title}
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { ReferencedTickets };
