import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div className="w-96 animate-fade-in-from-top">
      <TicketItem key={ticket.id} ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
