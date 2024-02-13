import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <header className="sticky top-8 z-50 flex w-full px-8 justify-between">
        <div />
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: 'outline' })}
        >
          Sign In
        </Link>
      </header>

      <div className="flex-1 pt-8">HomePage</div>
    </>
  );
};

export default HomePage;
