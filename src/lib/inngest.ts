import { EventSchemas, Inngest } from 'inngest';
import { EmailVerificationEventArgs } from '@/features/auth/events/event-email-verification';
import { PasswordResetEventArgs } from '@/features/password/events/event-password-reset';

type Events = {
  'app/password.reset': PasswordResetEventArgs;
  'app/auth.email-verification': EmailVerificationEventArgs;
};

export const inngest = new Inngest({
  id: 'the-road-to-next',
  schemas: new EventSchemas().fromRecord<Events>(),
});
