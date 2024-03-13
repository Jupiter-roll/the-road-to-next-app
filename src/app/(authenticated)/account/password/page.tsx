import { Heading } from '@/components/heading';
import { AccountTabs } from '../_tabs/account-tabs';

const PasswordPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        actions={<AccountTabs />}
      />
    </div>
  );
};

export default PasswordPage;
