import { cloneElement } from 'react';
import { MessageSquareWarningIcon } from 'lucide-react';

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactNode;
};

const Placeholder = ({
  label,
  icon = <MessageSquareWarningIcon />,
  button = null,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-4">
      {cloneElement(icon as React.ReactElement, {
        className: 'w-16 h-16',
      })}

      <h2 className="text-lg text-center">{label}</h2>

      {button ? button : <div />}
    </div>
  );
};

export { Placeholder };
