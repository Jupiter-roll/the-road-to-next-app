import { Heading } from '@/components/heading';
import { AccountTabs } from '../_tabs/account-tabs';

const ProfilePage = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Profile"
        description="Update your profile information"
        actions={<AccountTabs />}
      />
    </div>
  );
};

export default ProfilePage;
