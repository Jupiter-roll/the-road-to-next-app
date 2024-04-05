import { redirect } from 'next/navigation';
import { getMembership } from '@/features/membership/queries/get-membership';
import { getOrganizationsByUser } from '@/features/organization/queries/get-organizations-by-user';
import {
  emailVerificationPath,
  onboardingPath,
  selectActiveOrganizationPath,
  signInPath,
} from '@/paths';
import { getAuth } from './get-auth';

type GetCurrentAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
  checkAdminByOrganizationId?: string | null;
};

export const getCurrentAuthOrRedirect = async (
  options?: GetCurrentAuthOrRedirectOptions
) => {
  const {
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
    checkAdminByOrganizationId = null,
  } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  if (checkOrganization) {
    const organizations = await getOrganizationsByUser(auth.user.id);

    if (!organizations.length) {
      redirect(onboardingPath());
    }
  }

  if (checkActiveOrganization && !auth.user.activeOrganizationId) {
    redirect(selectActiveOrganizationPath());
  }

  if (checkAdminByOrganizationId) {
    const membership = await getMembership({
      organizationId: checkAdminByOrganizationId,
      userId: auth.user.id,
    });

    const isAdmin = membership?.membershipRole === 'ADMIN';

    if (!isAdmin) {
      redirect(signInPath());
    }
  }

  return auth;
};
