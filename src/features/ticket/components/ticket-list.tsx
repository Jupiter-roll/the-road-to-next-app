import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

const TicketList = async () => {
  const tickets = await getTickets();

  return (
    <div className="flex flex-col gap-y-2 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
