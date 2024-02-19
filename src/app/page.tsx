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
    <>
      <header className="sticky top-8 z-50 flex w-full px-8 justify-between">
        <div />
        <div>
          <Link
            href={signInPath()}
            className={buttonVariants({ variant: 'outline' })}
          >
            Sign In
          </Link>
          <Link
            href={signUpPath()}
            className={buttonVariants({ variant: 'outline' })}
          >
            Sign Up
          </Link>
        </div>
      </header>

      <div className="flex-1 pt-8 flex">
        <div className="w-96 flex flex-col gap-y-8">
          <Suspense fallback={<Spinner />}>
            <TicketList
              searchParams={searchParamsCache.parse(searchParams)}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HomePage;
