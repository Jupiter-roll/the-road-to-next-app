import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

const TicketList = async () => {
  const tickets = await getTickets();

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
