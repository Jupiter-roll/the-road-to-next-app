import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { notFound } from 'next/navigation';

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
    <div className="w-96 flex flex-col gap-y-8">
      <div className="animate-fade-in-from-top">
        <TicketUpsertForm ticket={ticket} />
      </div>
    </div>
  );
};

export default TicketEditPage;
