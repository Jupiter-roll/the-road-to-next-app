import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentCreateForm } from "./comment-create-form";
import { CommentList } from "./comment-list";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />

      <Suspense
        fallback={
          <div className="flex flex-col gap-y-4 ml-8">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        }
      >
        <CommentList ticketId={ticketId} />
      </Suspense>
    </>
  );
};

export { Comments };
