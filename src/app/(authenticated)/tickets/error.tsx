'use client';

import { MessageSquareWarningIcon } from 'lucide-react';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="self-center flex flex-col items-center gap-y-2">
      <MessageSquareWarningIcon className="w-12 h-12" />

      <h2 className="text-md">
        {error.message ?? 'Something went wrong!'}
      </h2>
    </div>
  );
}
