import { Loader2Icon } from 'lucide-react';

export default function Loading() {
  return (
    <div
      role="status"
      className="flex-1 self-center flex flex-col items-center justify-center"
    >
      <Loader2Icon className="h-16 w-16 animate-spin" />
    </div>
  );
}
