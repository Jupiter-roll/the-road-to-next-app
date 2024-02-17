import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import {
  dashboardPath,
  settingsPath,
  signInPath,
  ticketsPath,
} from '@/utils/paths';
import { SignOutButton } from '@/features/auth/components/sign-out-buttom';
import { validateRequest } from '@/features/auth/queries/validate-request';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'The Road to Next - Dashboard',
  description: 'The Dashboard',
};

const leftNavItems = [
  { title: 'Dashboard', href: dashboardPath() },
  { title: 'Tickets', href: ticketsPath() },
  { title: 'Settings', href: settingsPath() },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();

  if (!user) {
    redirect(signInPath());
  }

  return (
    <>
      <header className="sticky top-8 z-50 flex w-full px-8 justify-between">
        <Navigation leftNavItems={leftNavItems} />

        <SignOutButton />
      </header>

      <div className="flex-1 pt-8 flex">{children}</div>
    </>
  );
}
