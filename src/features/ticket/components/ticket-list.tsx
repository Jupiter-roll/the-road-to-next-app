import { Placeholder } from '@/components/placeholder';
import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-params';
import { TicketItem } from './ticket-item';
import { TicketPagination } from './ticket-pagination';
import { TicketSearchInput } from './ticket-search-input';
import { TicketSortSelect } from './ticket-sort-select';

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({
  userId,
  searchParams,
}: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } =
    await getTickets(userId, searchParams);

  return (
    <div className="space-y-4">
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
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}

      {tickets.length === 0 && (
        <div className="w-[420px] h-[210px] flex flex-col justify-center">
          <Placeholder label="No tickets" />
        </div>
      )}

      <TicketPagination {...ticketMetadata} />
    </div>
  );
};

export { TicketList };
