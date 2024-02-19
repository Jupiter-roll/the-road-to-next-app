import { SearchInput } from '@/components/search-input';
import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';
import { SortSelect } from '@/components/sort-select';
import { SerliazedSearchParams } from '../search-params';

type TicketListProps = {
  userId?: string;
  searchParams: SerliazedSearchParams;
};

const TicketList = async ({
  userId,
  searchParams,
}: TicketListProps) => {
  console.log(searchParams);
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <SearchInput placeholder="Search tickets ..." />
        <SortSelect
          defaulltValue="newest"
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'bounty', label: 'Bounty' },
          ]}
        />
      </div>

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
