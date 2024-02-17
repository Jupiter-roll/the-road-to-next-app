import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { forgotPasswordPath, signUpPath } from '@/utils/paths';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Card className="w-[350px]">
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
            href={forgotPasswordPath()}
          >
            Forgot Password?
          </Link>

          <Link
            className="text-sm text-muted-foreground"
            href={signUpPath()}
          >
            No account yet?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
