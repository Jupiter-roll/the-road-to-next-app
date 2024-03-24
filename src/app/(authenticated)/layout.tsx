import { redirect } from 'next/navigation';
import { getAuth } from '@/features/auth/queries/get-auth';
import { emailVerificationPath, signInPath } from '@/paths';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  if (user && !user.emailVerified) {
    redirect(emailVerificationPath());
  }

  return <>{children}</>;
}
