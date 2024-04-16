import { Placeholder } from "@/components/placeholder";
import { TicketItem } from "@/feature/ticket/components/ticket-item";
import { getTicket } from "@/feature/ticket/queries/get-ticket";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticket = await getTicket(params.ticketId);

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
