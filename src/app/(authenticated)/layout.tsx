import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import {
  dashboardPath,
  homePath,
  settingsPath,
  ticketsPath,
} from '@/utils/paths';

export const metadata: Metadata = {
  title: 'The Road to Next - Dashboard',
  description: 'The Dashboard',
};

const leftNavItems = [
  { title: 'Dashboard', href: dashboardPath() },
  { title: 'Tickets', href: ticketsPath() },
  { title: 'Settings', href: settingsPath() },
];

const rightNavItems = [{ title: 'Sign Out', href: homePath() }];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-8 z-50 flex w-full px-8 justify-between">
        <Navigation
          leftNavItems={leftNavItems}
          rightNavItems={rightNavItems}
        />
      </header>

      <div className="flex-1 pt-8 flex">{children}</div>
    </>
  );
}
