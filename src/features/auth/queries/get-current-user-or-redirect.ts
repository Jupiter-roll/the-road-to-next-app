import { signInPath } from '@/utils/paths';
import { redirect } from 'next/navigation';
import { validateRequest } from './validate-request';

export const getCurrentUserOrRedirect = async () => {
  const { user } = await validateRequest();

  if (!user) {
    redirect(signInPath());
  }

  return { user };
};
