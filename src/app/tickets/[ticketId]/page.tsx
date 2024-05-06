import { Placeholder } from "@/components/placeholder";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({ params }: TicketPageProps) => {
  const ticket = initialTickets.find((ticket) => ticket.id === params.ticketId);

  if (!ticket) {
    return <Placeholder label="Ticket not found" />;
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
