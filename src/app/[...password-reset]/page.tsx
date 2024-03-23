import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PasswordResetForm } from '@/features/password/components/password-reset-form';

type PasswordResetPage = {
  params: {
    'password-reset': (string | undefined)[];
  };
};

const PasswordResetPage = ({ params }: PasswordResetPage) => {
  const verificationToken = params['password-reset'][1];

  if (!verificationToken) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="w-[420px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle>New Password</CardTitle>
          <CardDescription>
            Enter a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordResetForm verificationToken={verificationToken} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetPage;
