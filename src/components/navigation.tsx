'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

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
  leftNavItems: NavItem[];
};

const Navigation = ({ leftNavItems }: NavigationProps) => (
  <>
    <NavigationMenu>
      <NavigationMenuList>
        {leftNavItems.map((item) => (
          <NavigationItem key={item.title} navItem={item} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  </>
);

export { Navigation };
