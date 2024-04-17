import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
// import { prisma } from "@/lib/prisma";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

// export async function generateStaticParams() {
//   const tickets = await prisma.ticket.findMany();

//   return tickets.map((ticket) => ({
//     ticketId: ticket.id,
//   }));
// }

export default TicketPage;
