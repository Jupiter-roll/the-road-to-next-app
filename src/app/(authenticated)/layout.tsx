import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getCurrentAuthOrRedirect();

  return <>{children}</>;
}
