import { Placeholder } from '@/components/placeholder';
import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-params';
import { TicketItem } from './ticket-item';
import { TicketPagination } from './ticket-pagination';
import { TicketSearchInput } from './ticket-search-input';
import { TicketSortSelect } from './ticket-sort-select';

type TicketListProps = {
  userId?: string;
  byOrganization?: boolean;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({
  userId,
  byOrganization = false,
  searchParams,
}: TicketListProps) => {
  const { list: tickets, metadata: ticketMetadata } =
    await getTickets(userId, byOrganization, searchParams);

  if (!tickets.length) {
    return <Placeholder label="There are no tickets" />;
  }

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

      <TicketPagination {...ticketMetadata} />
    </div>
  );
};

export { TicketList };
