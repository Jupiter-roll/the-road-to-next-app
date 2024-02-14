import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

const TicketList = async () => {
  const tickets = await getTickets(
    Number((Math.random() * 1000).toFixed(0))
  );

  return (
    <div className="flex flex-col gap-y-2">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          isDetail={false}
        />
      ))}
    </div>
  );
};

export { TicketList };
