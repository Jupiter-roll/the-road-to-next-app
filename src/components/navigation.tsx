'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { SignOutButton } from '@/features/auth/components/sign-out-buttom';
import { getAuth } from '@/features/auth/queries/get-auth';
import {
  ticketsPath,
  settingsPath,
  homePath,
  signInPath,
  signUpPath,
} from '@/utils/paths';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { KanbanIcon } from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
};

type NavigationItemProps = {
  navItem: NavItem;
};

const NavigationItem = ({ navItem }: NavigationItemProps) => (
  <NavigationMenuItem key={navItem.title}>
    <Link href={navItem.href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {navItem.title}
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

type NavigationProps = {
  user: Awaited<ReturnType<typeof getAuth>>['user'];
};

const Navigation = async ({ user }: NavigationProps) => {
  return (
    <header className="sticky top-8 z-50 flex w-full px-8 justify-between">
      {/* left side */}
      {user ? (
        <NavigationMenu>
          <NavigationMenuList>
            {[
              { title: 'Tickets', href: ticketsPath() },
              { title: 'Settings', href: settingsPath() },
            ].map((item) => (
              <NavigationItem key={item.title} navItem={item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <Link
          href={homePath()}
          className={buttonVariants({
            size: 'icon',
            variant: 'link',
          })}
        >
          <KanbanIcon />
        </Link>
      )}

      {/* right side */}
      {user ? (
        <SignOutButton />
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            {[
              { title: 'Sign In', href: signInPath() },
              {
                title: 'Sign Up',
                href: signUpPath(),
                variant: 'default',
              },
            ].map((item) => (
              <NavigationItem key={item.title} navItem={item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </header>
  );
};

export { Navigation };
