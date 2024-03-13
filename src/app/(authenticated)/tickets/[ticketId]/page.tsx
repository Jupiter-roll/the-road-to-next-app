import { notFound } from 'next/navigation';
import { TicketItem } from '@/features/ticket/components/ticket-item';
import { getTicket } from '@/features/ticket/queries/get-ticket';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { homePath } from '@/paths';

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
    <div className="flex flex-col flex-1 gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: 'Tickets', href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />

      <div className="flex flex-col gap-y-8">
        <div className="mx-auto animate-fade-in-from-top">
          <TicketItem ticket={ticket} isDetail />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
