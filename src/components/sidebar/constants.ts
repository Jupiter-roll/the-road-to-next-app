import {
  LibraryIcon,
  BookIcon,
  UserIcon,
  LockIcon,
  BookUserIcon,
} from 'lucide-react';
import { NavItem } from './types';
import {
  passwordPath,
  homePath,
  profilePath,
  ticketsPath,
} from '@/paths';

export const navItems: NavItem[] = [
  {
    title: 'All Tickets',
    icon: LibraryIcon,
    href: homePath(),
    color: 'text-sky-500',
  },
  {
    title: 'My Tickets',
    icon: BookIcon,
    href: ticketsPath(),
    color: 'text-sky-500',
  },
  {
    title: 'Account',
    icon: UserIcon,
    href: '',
    color: 'text-orange-500',
    children: [
      {
        title: 'Profile',
        icon: BookUserIcon,
        color: 'text-red-500',
        href: profilePath(),
      },
      {
        title: 'Password',
        icon: LockIcon,
        color: 'text-red-500',
        href: passwordPath(),
      },
    ],
  },
];

export const closedClassName =
  'text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
