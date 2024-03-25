import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmailVerificationForm } from '@/features/auth/components/email-verification-form';
import { EmailVerificationResendForm } from '@/features/auth/components/email-verification-resend-form';

const EmailVerificationPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="w-[420px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Please verify your email to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailVerificationForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <EmailVerificationResendForm />
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
