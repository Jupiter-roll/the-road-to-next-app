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
    title: 'Tickets',
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
