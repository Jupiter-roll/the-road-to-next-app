import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/tickets/components/ticket-list';

const HomePage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <div className="mx-auto animate-fade-in-from-top">
          <TicketList />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
