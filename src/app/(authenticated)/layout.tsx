import type { Metadata } from 'next';
import { signInPath } from '@/utils/paths';
import { getAuth } from '@/features/auth/queries/get-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'The Road to Next - Dashboard',
  description: 'The Dashboard',
};

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  return <>{children}</>;
}
