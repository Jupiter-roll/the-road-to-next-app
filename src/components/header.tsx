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
import { ThemeSwitcher } from './theme/theme-switcher';

const Header = async () => {
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
        variant="outline"
      />
    </form>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: 'outline' })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: 'default' })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      "
    >
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: 'ghost' })}
        >
          <KanbanIcon />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
        {maybeAuthenticatedLeftNavigation}
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {maybeAuthenticatedRightNavigation}
      </div>
    </nav>
  );
};

export { Header };
