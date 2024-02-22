import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTickets } from '@/features/ticket/queries/get-tickets';

const TicketsPage = async () => {
  const tickets = await getTickets();
  await getTickets();

  return (
    <div className="w-96 flex flex-col gap-y-2 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketsPage;
