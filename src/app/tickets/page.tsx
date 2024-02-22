import { initialTickets } from '@/data';
import { TicketItem } from '@/features/ticket/components/ticket-item';

const TicketsPage = () => {
  return (
    <div className="w-96 flex flex-col gap-y-2 animate-fade-in-from-top">
      {initialTickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketsPage;
