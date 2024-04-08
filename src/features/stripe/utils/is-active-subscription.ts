import { StripeCustomer } from '@prisma/client';

export const isActiveSubscription = (
  stripeCustomer: StripeCustomer | null | undefined
) => {
  return (
    stripeCustomer?.subscriptionStatus === 'active' ||
    stripeCustomer?.subscriptionStatus === 'trialing'
  );
};
