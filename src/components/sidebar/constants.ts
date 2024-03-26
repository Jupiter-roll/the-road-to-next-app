import {
  BookCopyIcon,
  BookIcon,
  BookUserIcon,
  LibraryIcon,
  LockIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react';
import {
  homePath,
  organizationsPath,
  passwordPath,
  profilePath,
  ticketsByOrganizationPath,
  ticketsPath,
} from '@/paths';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  {
    title: 'All Tickets',
    icon: LibraryIcon,
    href: homePath(),
    color: 'text-sky-500',
  },
  {
    title: 'Our Tickets',
    icon: BookCopyIcon,
    href: ticketsByOrganizationPath(),
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
  {
    title: 'Organization',
    icon: UsersIcon,
    href: organizationsPath(),
    color: 'text-red-500',
  },
];

export const closedClassName =
  'text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
