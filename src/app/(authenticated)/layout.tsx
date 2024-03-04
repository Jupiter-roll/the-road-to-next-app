import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';
import { getAuth } from '@/features/auth/queries/get-auth';

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
