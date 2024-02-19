import { Spinner } from '@/components/spinner';
import { buttonVariants } from '@/components/ui/button';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { signInPath, signUpPath } from '@/utils/paths';
import Link from 'next/link';
import { Suspense } from 'react';

type HomePageProps = {
  searchParams: {
    search: string;
  };
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
            <TicketList search={searchParams.search} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HomePage;
