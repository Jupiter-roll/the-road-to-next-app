import { initialTickets } from '@/data';
import { Heading } from '@/components/heading';
import { TicketItem } from '@/features/tickets/components/ticket-item';

const TicketsPage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <Heading
        title="Tickets"
        description="All your tickets at one place"
      />

      <div className="mx-auto space-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
