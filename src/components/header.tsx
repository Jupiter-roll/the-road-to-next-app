import Link from 'next/link';
import { KanbanIcon } from 'lucide-react';
import { homePath, ticketsPath } from '@/paths';
import { buttonVariants } from './ui/button';
import { ThemeSwitcher } from './theme/theme-switcher';

const Header = () => {
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
          <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: 'outline' })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
};

export { Header };
