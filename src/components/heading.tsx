import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
  tabs?: React.ReactNode;
};

const Heading = ({ title, description, breadcrumbs, tabs }: HeadingProps) => {
  return (
    <>
      <div className="px-8">
        <div className="flex justify-between items-center">
          <div>{breadcrumbs}</div>
          <div>{tabs}</div>
        </div>

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
