import Link from 'next/link';
import { homePath, ticketsPath } from '@/paths';
import { buttonVariants } from './ui/button';
import { KanbanIcon } from 'lucide-react';

const Navigation = () => {
  return (
    <nav
      className="
        fixed z-50 top-0
        w-full flex py-2.5 px-3 justify-between
        backdrop-blur-md bg-gray-900/50
        border-b-1 border-slate-950
      "
    >
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({
            variant: 'link',
            size: 'icon',
          })}
        >
          <KanbanIcon />
        </Link>
      </div>
      <div>
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

export { Navigation };
