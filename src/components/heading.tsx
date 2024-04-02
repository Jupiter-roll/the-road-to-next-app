import { Separator } from './ui/separator';

type HeadingProps = {
  title: string;
  description?: string;
  actions?: React.ReactElement;
  topNav?: React.ReactElement;
};

const Heading = ({
  title,
  description,
  actions,
  topNav,
}: HeadingProps) => {
  return (
    <>
      {topNav}
      <div className="flex items-center justify-between px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="flex gap-x-2">{actions}</div>
      </div>

      <Separator />
    </>
  );
};

export { Heading };
