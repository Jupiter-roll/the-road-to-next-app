import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Fragment } from 'react';

type EmailInvitationProps = {
  fromName: string;
  url: string;
};

const EmailInvitation = ({ fromName, url }: EmailInvitationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Fragment>
          <Body className="font-sans m-8 text-center">
            <Container>
              <Section>
                <Text>
                  Hello there. Someone invited you to join the
                  organization {fromName}. Please click the link below
                  to accept the invitation.
                </Text>
              </Section>
              <Section>
                <Button
                  href={url}
                  className="bg-black rounded text-white p-2 m-2"
                >
                  Accept Invitation
                </Button>
              </Section>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  );
};

EmailInvitation.PreviewProps = {
  fromName: 'The Road to Next',
  url: 'http://localhost:3000/email-invitation/abc123',
} as EmailInvitationProps;

export default EmailInvitation;
