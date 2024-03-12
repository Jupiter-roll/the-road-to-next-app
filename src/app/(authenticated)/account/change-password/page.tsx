import { Heading } from '@/components/heading';
import { AccountTabs } from '@/features/account/components/account-tabs';

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Change Password"
        description="Change your password to keep your account secure"
        actions={<AccountTabs />}
      />
    </div>
  );
};

export default ChangePasswordPage;
