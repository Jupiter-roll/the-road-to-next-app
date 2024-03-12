import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { signUpPath, forgotPasswordPath } from '@/paths';

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="w-[420px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            className="text-sm text-muted-foreground"
            href={signUpPath()}
          >
            No account yet?
          </Link>

          <Link
            className="text-sm text-muted-foreground"
            href={forgotPasswordPath()}
          >
            Forgot Password
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
