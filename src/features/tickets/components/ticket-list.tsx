import { SearchInput } from '@/components/search-input';
import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

type TicketListProps = {
  userId?: string;
  search: string;
};

const TicketList = async ({ userId, search }: TicketListProps) => {
  const tickets = await getTickets(userId, search);

  return (
    <div className="space-y-4">
      <SearchInput placeholder="Search tickets ..." />

      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
