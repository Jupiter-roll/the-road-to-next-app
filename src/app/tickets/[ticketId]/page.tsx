import { initialTickets } from '@/data';
import { TicketItem } from '@/features/ticket/components/ticket-item';

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({ params }: TicketPageProps) => {
  const ticket = initialTickets.find(
    (ticket) => ticket.id === params.ticketId
  );

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
