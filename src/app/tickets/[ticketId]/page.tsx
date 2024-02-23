import { Spinner } from '@/components/spinner';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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
    <div className="w-96 flex-1 animate-fade-in-from-top">
      <TicketItem key={ticket.id} ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
