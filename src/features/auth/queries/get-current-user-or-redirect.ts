import { signInPath } from '@/utils/paths';
import { redirect } from 'next/navigation';
import { getAuth } from './get-auth';

export const getCurrentUserOrRedirect = async () => {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  return { user };
};
