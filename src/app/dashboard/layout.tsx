import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Road to Next - Dashboard',
  description: 'The Dashboard',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-8 z-50 flex w-full px-8 justify-between ">
        <div className="flex gap-x-4">
          <Link href="/dashboard/tickets">Tickets</Link>
          <Link href="/dashboard/settings">Settings</Link>
        </div>

        <div>
          <Link href="/">Sign Out</Link>
        </div>
      </header>

      <div className="flex-1 pt-8">{children}</div>
    </>
  );
}
