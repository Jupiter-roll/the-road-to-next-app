import { Link } from 'lucide-react';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { passwordForgotPath } from '@/paths';
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
            <CardTitle>New Password</CardTitle>
            <CardDescription>
              Enter a new password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Button asChild>
              <Link href={passwordForgotPath()}>Change Password</Link>
            </Button> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordPage;
