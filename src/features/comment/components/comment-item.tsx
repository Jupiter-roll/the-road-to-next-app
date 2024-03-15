'use client';

import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { CommentWithUser } from '../types';
import { CommentDeleteButton } from './comment-delete-button';

type CommentItemProps = {
  comment: CommentWithUser & { isOwner: boolean };
  onRemoveComment: (id: string) => void;
};

const CommentItem = ({
  comment,
  onRemoveComment,
}: CommentItemProps) => {
  return (
    <div className="flex gap-x-1">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? 'Deleted User'}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(comment.createdAt, 'yyyy-MM-dd, HH:mm')}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      {comment.isOwner && (
        <CommentDeleteButton
          id={comment.id}
          onRemoveComment={onRemoveComment}
        />
      )}
    </div>
  );
};

export { CommentItem };
