import { getTickets } from '../queries/get-tickets';
import { TicketItem } from './ticket-item';
import { SerliazedSearchParams } from '../search-params';
import { TicketSearchInput } from './ticket-search-input';
import { TicketSortSelect } from './ticket-sort-select';
import { Placeholder } from '@/components/placeholder';

type TicketListProps = {
  userId?: string;
  searchParams: SerliazedSearchParams;
};

const TicketList = async ({
  userId,
  searchParams,
}: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  if (tickets.length === 0) {
    return (
      <div className="flex-1 flex">
        <Placeholder label="No tickets there yet." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            {
              sortKey: 'createdAt',
              sortValue: 'desc',
              label: 'Newest',
            },
            {
              sortKey: 'bounty',
              sortValue: 'desc',
              label: 'Bounty',
            },
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
