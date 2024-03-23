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

type EmailPasswordResetProps = {
  username: string;
  url: string;
};

const EmailPasswordReset = ({
  username,
  url,
}: EmailPasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Fragment>
          <Body className="font-sans m-8 text-center">
            <Container>
              <Section>
                <Text>
                  Hello {username}, you have requested to reset your
                  password. Click the button below to reset your
                  password.
                </Text>
              </Section>
              <Button
                href={url}
                className="bg-black rounded text-white p-2 m-2"
              >
                Reset Password
              </Button>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  username: 'Robin Wieruch',
  url: 'http://localhost:3000/password-reset/abc123',
} as EmailPasswordResetProps;

export default EmailPasswordReset;
