import { buttonVariants } from '@/components/ui/button';
import { signInPath, signUpPath } from '@/utils/paths';
import Link from 'next/link';

const HomePage = () => {
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

      <div className="flex-1 pt-8 flex">HomePage</div>
    </>
  );
};

export default HomePage;
