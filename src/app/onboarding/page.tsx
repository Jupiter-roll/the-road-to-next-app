import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrganizationCreateForm } from '@/features/organization/components/organization-create-form';

const OnboardingPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="w-[420px] animate-fade-in-from-top">
        <CardHeader>
          <CardTitle>Create Organization</CardTitle>
          <CardDescription>
            Create an organization to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationCreateForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
