import { SearchInput } from '@/components/search-input';
import { SearchParams } from '../search-params';
import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({
  userId,
  searchParams,
}: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

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
