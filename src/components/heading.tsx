import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  topNav?: React.ReactNode;
};

const Heading = ({ title, description, topNav }: HeadingProps) => {
  return (
    <>
      {topNav}

      <div className="px-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Separator />
    </>
  );
};

export { Heading };
