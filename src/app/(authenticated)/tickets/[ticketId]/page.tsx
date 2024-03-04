import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { RedirectToast } from '@/components/redirect-toast';

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
    <>
      <div className="w-96 flex-1 animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>

      <RedirectToast />
    </>
  );
};

export async function generateStaticParams() {
  const tickets = await prisma.ticket.findMany();

  return tickets.map((ticket) => ({
    ticketId: ticket.id,
  }));
}

export default TicketPage;
