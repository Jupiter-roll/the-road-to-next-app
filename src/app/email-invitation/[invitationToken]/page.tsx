import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InvitationAcceptForm } from '@/features/invitation/components/invitation-accept-form';

type EmailInvitationPageProps = {
  params: {
    invitationToken: string;
  };
};

const EmailInvitationPage = ({
  params,
}: EmailInvitationPageProps) => {
  console.log(params);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="w-[420px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle>Invitation to Organization</CardTitle>
          <CardDescription>
            Accept the invitation to join the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InvitationAcceptForm {...params} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInvitationPage;
