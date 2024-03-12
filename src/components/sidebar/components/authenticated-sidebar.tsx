import { getAuth } from '@/features/auth/queries/get-auth';
import { getCookieByKey, setCookieByKey } from '@/actions/cookies';
import { Sidebar } from './sidebar';

const AuthenticatedSidebar = async () => {
  const { user } = await getAuth();

  const isOpenCookie = await getCookieByKey('sidebar');
  const handleChangeOpen = setCookieByKey.bind(null, 'sidebar');

  if (!user) return null;

  return (
    <Sidebar
      initialIsOpen={isOpenCookie}
      onChangeOpen={handleChangeOpen}
    />
  );
};

export { AuthenticatedSidebar };
