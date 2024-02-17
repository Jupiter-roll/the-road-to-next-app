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
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            className="text-sm text-muted-foreground flex items-center"
            href={homePath()}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Home
          </Link>

          <Link
            className="text-sm text-muted-foreground"
            href={signInPath()}
          >
            Or Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
