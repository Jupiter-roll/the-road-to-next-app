import { Membership, Organization } from '@prisma/client';
import { Session, User } from 'lucia';
import { redirect } from 'next/navigation';
import {
  emailVerificationPath,
  onboardingPath,
  selectActiveOrganizationPath,
  signInPath,
} from '@/paths';
import { getAuth } from './get-auth';

type GetCurrentAuthOrRedirectOptions = {
  checkUser?: boolean;
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

export const getCurrentAuthOrRedirect = async (
  options?: GetCurrentAuthOrRedirectOptions
) => {
  const {
    checkUser = true,
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
  } = options ?? {};

  const auth = await getAuth();

  if (checkUser && !auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user?.emailVerified) {
    redirect(emailVerificationPath());
  }

  if (checkOrganization && !auth.organizations.length) {
    redirect(onboardingPath());
  }

  if (checkActiveOrganization && !auth.user?.activeOrganizationId) {
    redirect(selectActiveOrganizationPath());
  }

  return auth as {
    user: User & { activeOrganizationId: string };
    session: Session;
    organizations: (Organization & { memberships: Membership[] })[];
  };
};
