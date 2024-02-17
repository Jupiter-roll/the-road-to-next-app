import { buttonVariants } from '@/components/ui/button';
import { dashboardPath } from '@/utils/paths';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <header className="sticky top-8 z-50 flex w-full px-8 justify-between">
        <div />
        <Link
          href={dashboardPath()}
          className={buttonVariants({ variant: 'outline' })}
        >
          Sign In
        </Link>
      </header>

      <div className="flex-1 pt-8 flex">HomePage</div>
    </>
  );
};

export default HomePage;
