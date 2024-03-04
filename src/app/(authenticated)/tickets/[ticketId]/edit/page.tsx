import { notFound } from 'next/navigation';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { getTicket } from '@/features/ticket/queries/get-ticket';

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
    <div className="w-96 flex-1 animate-fade-in-from-top">
      <TicketUpsertForm ticket={ticket} />
    </div>
  );
};

export default TicketEditPage;
