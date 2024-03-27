// import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { user, organizations } = await getCurrentAuthOrRedirect();

  return <>{children}</>;
}
