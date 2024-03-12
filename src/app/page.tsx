import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/tickets/components/ticket-list';

type HomePageProps = {
  searchParams: {
    search: string;
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <Suspense fallback={<Spinner />}>
        <div className="mx-auto animate-fade-in-from-top">
          <TicketList search={searchParams.search} />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
