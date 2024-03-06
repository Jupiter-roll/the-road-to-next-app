import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { Spinner } from '@/components/spinner';

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Tickets"
        description="All your tickets at one place"
      />

      <Suspense fallback={<Spinner />}>
        <div className="mx-auto animate-fade-in-from-top">
          <TicketList />
        </div>
      </Suspense>
    </div>
  );
};

export default TicketsPage;
