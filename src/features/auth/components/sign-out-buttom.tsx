import { Button } from '@/components/ui/button';
import { signOut } from '../actions/sign-out';

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <Button variant="outline">Sign Out</Button>
    </form>
  );
};

export { SignOutButton };
