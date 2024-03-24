import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Fragment } from 'react';

type EmailVerificationProps = {
  username: string;
  verificationCode: string;
};

const EmailVerification = ({
  username,
  verificationCode,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Fragment>
          <Body className="font-sans m-8 text-center">
            <Container>
              <Section>
                <Text>
                  Hello {username}, please verify your email address
                  by using the following code:
                </Text>
              </Section>
              <Section>
                <Text className="bg-black rounded text-white p-2 m-2">
                  {verificationCode}
                </Text>
              </Section>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  username: 'Robin Wieruch',
  verificationCode: '95990511',
} as EmailVerificationProps;

export default EmailVerification;
