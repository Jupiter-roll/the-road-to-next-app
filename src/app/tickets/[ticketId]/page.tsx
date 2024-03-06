import { notFound } from 'next/navigation';
import { TicketItem } from '@/features/tickets/components/ticket-item';
import { getTicket } from '@/features/tickets/queries/get-ticket';

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
    <div className="flex flex-col gap-y-8">
      <div className="mx-auto animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
