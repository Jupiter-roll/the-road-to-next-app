import { Suspense } from 'react';
import { SearchParams } from 'nuqs/server';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { searchParamsCache } from '@/features/ticket/search-params';

type HomePageProps = {
  searchParams: SearchParams;
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
          <TicketList
            searchParams={searchParamsCache.parse(searchParams)}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
