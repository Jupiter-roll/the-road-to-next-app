import { getAuth } from '@/features/auth/queries/get-auth';
import { Products } from '@/features/stripe/components/products';

const PricingPage = async () => {
  const { user } = await getAuth();

  return <Products organizationId={user?.activeOrganizationId} />;
};

export default PricingPage;
