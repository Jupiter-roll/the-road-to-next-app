import { Search } from '@/components/search';
import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

type TicketListProps = {
  userId?: string;
  search: string;
};

const TicketList = async ({ userId, search }: TicketListProps) => {
  const tickets = await getTickets(userId, search);

  return (
    <div className="flex flex-col gap-y-2">
      <Search placeholder="Search tickets ..." />

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
