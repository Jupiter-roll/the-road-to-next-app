import { initialTickets } from '@/data';
import { TicketItem } from '@/features/tickets/components/ticket-item';

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
    <div className="flex flex-col gap-y-8">
      <div className="mx-auto animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
