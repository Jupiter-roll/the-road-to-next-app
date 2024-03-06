import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TicketUpsertForm } from '@/features/tickets/components/ticket-upsert-form';
import { getTicket } from '@/features/tickets/queries/get-ticket';

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="w-[420px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle>Edit Ticket</CardTitle>
          <CardDescription>Edit an existing ticket</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketUpsertForm ticket={ticket} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketEditPage;
