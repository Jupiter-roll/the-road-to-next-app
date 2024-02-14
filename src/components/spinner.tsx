import { Loader2Icon } from 'lucide-react';

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex-1 flex flex-col justify-center items-center"
    >
      <Loader2Icon className="h-8 w-8 animate-spin" />
    </div>
  );
};

export { Spinner };
