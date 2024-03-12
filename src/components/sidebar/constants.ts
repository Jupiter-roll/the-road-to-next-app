import {
  LibraryIcon,
  BookIcon,
  UserIcon,
  LockIcon,
  KeyIcon,
} from 'lucide-react';
import { NavItem } from './types';
import {
  changePasswordPath,
  forgotPasswordPath,
  homePath,
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
        title: 'Change Password',
        icon: LockIcon,
        color: 'text-red-500',
        href: changePasswordPath(),
      },
      {
        title: 'Forgot Password',
        icon: KeyIcon,
        color: 'text-red-500',
        href: forgotPasswordPath(),
      },
    ],
  },
];

export const closedClassName =
  'text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
