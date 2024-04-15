'use client';

import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { acceptInvitation } from '../actions/accept-invitation';

type InvitationAcceptFormProps = {
  invitationToken: string;
};

const InvitationAcceptForm = ({
  invitationToken,
}: InvitationAcceptFormProps) => {
  return (
    <Form action={acceptInvitation.bind(null, invitationToken)}>
      {() => <SubmitButton label="Accept" />}
    </Form>
  );
};

export { InvitationAcceptForm };
