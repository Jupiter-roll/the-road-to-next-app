import { LogOutIcon } from 'lucide-react';
import { signOut } from '../actions/sign-out';
import { SubmitButton } from '@/components/form/submit-button';

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <SubmitButton
        label="Sign Out"
        suffixIcon={<LogOutIcon />}
        variant="outline"
      />
    </form>
  );
};

export { SignOutButton };
