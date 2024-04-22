import { SearchInput } from "@/components/search-input";
import { getTickets } from "../queries/get-tickets";
import { SearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search tickets ..." />
      </div>

      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
