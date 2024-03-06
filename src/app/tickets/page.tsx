import { Heading } from '@/components/heading';
import { TicketItem } from '@/features/tickets/components/ticket-item';
import { getTickets } from '@/features/tickets/queries/get-tickets';

const TicketsPage = async () => {
  const tickets = await getTickets();

  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Tickets"
        description="All your tickets at one place"
      />

      <div className="mx-auto space-y-4 animate-fade-in-from-top">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
