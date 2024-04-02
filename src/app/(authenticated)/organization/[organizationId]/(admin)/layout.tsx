import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string };
}>) {
  await getCurrentAuthOrRedirect({
    checkAdminByOrganizationId: params.organizationId,
  });

  return <>{children}</>;
}
