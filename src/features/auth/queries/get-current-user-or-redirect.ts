import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';
import { getAuth } from './get-auth';

export const getCurrentUserOrRedirect = async () => {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  return user;
};
