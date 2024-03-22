'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { passwordPath,profilePath } from '@/paths';

const AccountTabs = () => {
  const pathName = usePathname();

  return (
    <Tabs value={pathName.split('/').at(-1)}>
      <TabsList>
        <TabsTrigger value="profile" asChild>
          <Link href={profilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="password" asChild>
          <Link href={passwordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };
