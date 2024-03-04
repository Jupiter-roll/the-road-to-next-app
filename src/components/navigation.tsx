import Link from 'next/link';
import {
  homePath,
  signInPath,
  signUpPath,
  ticketsPath,
} from '@/paths';
import { buttonVariants } from './ui/button';
import { KanbanIcon, LogOutIcon } from 'lucide-react';
import { SubmitButton } from './form/submit-button';
import { signOut } from '@/features/auth/actions/sign-out';
import { getAuth } from '@/features/auth/queries/get-auth';

const Navigation = async () => {
  const { user } = await getAuth();

  const maybeAuthenticatedLeftNavigation = user ? (
    <Link
      href={ticketsPath()}
      className={buttonVariants({ variant: 'ghost' })}
    >
      Tickets
    </Link>
  ) : null;

  const maybeAuthenticatedRightNavigation = user ? (
    <form action={signOut}>
      <SubmitButton
        label="Sign Out"
        suffixIcon={<LogOutIcon />}
        variant="ghost"
      />
    </form>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: 'ghost' })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: 'ghost' })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
        fixed z-50 top-0
        w-full flex py-2.5 px-5 justify-between
        backdrop-blur-md bg-gray-900/50
        border-b-1 border-slate-950
      "
    >
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({
            variant: 'link',
            size: 'icon',
          })}
        >
          <KanbanIcon />
        </Link>
        {maybeAuthenticatedLeftNavigation}
      </div>
      <div className="flex align-items gap-x-2">
        {maybeAuthenticatedRightNavigation}
      </div>
    </nav>
  );
};

export { Navigation };
