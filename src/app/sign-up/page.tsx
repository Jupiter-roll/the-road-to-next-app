import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { homePath, signInPath } from '@/utils/paths';
import { Undo2Icon } from 'lucide-react';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Card className="w-[350px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Sign Up
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
          <CardDescription>
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            className="text-sm text-muted-foreground"
            href={signInPath()}
          >
            Have an account? Sign In now.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
