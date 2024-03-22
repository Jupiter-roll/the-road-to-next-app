import { Heading } from '@/components/heading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PasswordChangeForm } from '@/features/auth/components/password-change-form';
import { AccountTabs } from '../_tabs/account-tabs';

const PasswordPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        actions={<AccountTabs />}
      />

      <div className="flex-1 flex flex-col justify-center items-center">
        <Card className="w-[420px] animate-fade-in-from-top">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Enter your current password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordChangeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordPage;
