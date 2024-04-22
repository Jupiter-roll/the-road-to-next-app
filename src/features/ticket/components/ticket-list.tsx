import { Placeholder } from "@/components/placeholder";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { getTickets } from "../queries/get-tickets";
import { SearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  if (!tickets.length) {
    return <Placeholder label="No tickets found" />;
  }

  return (
    <div className="flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <SearchInput placeholder="Search tickets ..." />
        <SortSelect
          defaulltValue="newest"
          options={[
            { value: "newest", label: "Newest" },
            { value: "bounty", label: "Bounty" },
          ]}
        />
      </div>

      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
