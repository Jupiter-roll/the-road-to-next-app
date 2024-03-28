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
  toName: string;
  code: string;
};

const EmailVerification = ({
  toName,
  code,
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
                  Hello {toName}, please verify your email address by
                  using the following code:
                </Text>
              </Section>
              <Section>
                <Text className="bg-black rounded text-white p-2 m-2">
                  {code}
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
  toName: 'Robin Wieruch',
  code: '95990511',
} as EmailVerificationProps;

export default EmailVerification;
