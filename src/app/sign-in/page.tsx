import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import {
  forgotPasswordPath,
  homePath,
  signUpPath,
} from '@/utils/paths';
import { Undo2Icon } from 'lucide-react';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Card className="w-[350px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Sign In
            <Link
              href={homePath()}
              className={buttonVariants({
                size: 'icon',
                variant: 'link',
              })}
            >
              <Undo2Icon />
            </Link>
          </CardTitle>
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
