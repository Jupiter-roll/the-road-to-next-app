import { getCookieByKey } from '@/actions/cookies';
import { getAuth } from '@/features/auth/queries/get-auth';
import { Sidebar } from './sidebar';

const AuthenticatedSidebar = async () => {
  const { user } = await getAuth();
  const isOpenCookie = await getCookieByKey('sidebar');

  if (!user) {
    return null;
  }

  const coercedCookie = isOpenCookie === 'true';

  return <Sidebar initialIsOpen={coercedCookie} />;
};

export { AuthenticatedSidebar };
