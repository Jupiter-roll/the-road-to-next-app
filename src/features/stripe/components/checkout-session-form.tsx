import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '../actions/create-checkout-session';
import { createCustomerPortal } from '../actions/create-customer-portal';

type CheckoutSessionFormProps = {
  organizationId: string | null | undefined;
  priceId: string;
  activePriceId: string | null | undefined;
  children: React.ReactNode;
};

const CheckoutSessionForm = ({
  organizationId,
  priceId,
  activePriceId,
  children,
}: CheckoutSessionFormProps) => {
  const action = !activePriceId
    ? createCheckoutSession.bind(null, organizationId, priceId)
    : createCustomerPortal.bind(null, organizationId);

  const isActivePrice = activePriceId === priceId;

  return (
    <form action={action}>
      <Button
        type="submit"
        disabled={isActivePrice}
        className={clsx('flex flex-col', {
          'h-16': !!activePriceId,
        })}
      >
        {!activePriceId ? null : isActivePrice ? (
          <span>Current Plan</span>
        ) : (
          <span>Other Plan</span>
        )}
        <div>{children}</div>
      </Button>
    </form>
  );
};

export { CheckoutSessionForm };
