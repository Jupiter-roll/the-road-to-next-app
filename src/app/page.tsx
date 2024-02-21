import { Navigation } from '@/components/navigation';
import { Spinner } from '@/components/spinner';
import { buttonVariants } from '@/components/ui/button';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { searchParamsCache } from '@/features/ticket/search-params';
import { signInPath, signUpPath } from '@/utils/paths';
import { Record } from '@prisma/client/runtime/library';
import Link from 'next/link';
import { Suspense } from 'react';

type HomePageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const HomePage = ({ searchParams }: HomePageProps) => {
  return (
    <div className="w-96 flex flex-col gap-y-8">
      <Suspense fallback={<Spinner />}>
        <TicketList
          searchParams={searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
