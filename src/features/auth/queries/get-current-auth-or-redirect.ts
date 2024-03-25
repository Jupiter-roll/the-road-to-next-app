import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';
import { getAuth } from './get-auth';

export const getCurrentAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
};
