'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { changePasswordPath, forgotPasswordPath } from '@/paths';

const AccountTabs = () => {
  const pathName = usePathname();

  return (
    <Tabs value={pathName.split('/').at(-1)}>
      <TabsList>
        <TabsTrigger value="change-password" asChild>
          <Link href={changePasswordPath()}>Change Password</Link>
        </TabsTrigger>
        <TabsTrigger value="forgot-password" asChild>
          <Link href={forgotPasswordPath()}>Forgot Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };
