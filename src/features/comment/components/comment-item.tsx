'use client';

import { format } from 'date-fns';
import { PaperclipIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AttachmentCreateButton } from '@/features/attachment/components/attachment-create-button';
import { AttachmentItem } from '@/features/attachment/components/attachment-item';
import { isOwner } from '@/features/auth/utils/is-owner';
import { CommentWithMetadata } from '../types';
import { CommentDeleteButton } from './comment-delete-button';

type CommentItemProps = {
  comment: CommentWithMetadata;
  onRemoveComment: (id: string) => void;
};

const CommentItem = ({
  comment,
  onRemoveComment,
}: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-y-2">
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
          <div className="flex flex-col gap-y-1">
            <AttachmentCreateButton
              entityId={comment.id}
              entity="COMMENT"
            />
            <CommentDeleteButton
              id={comment.id}
              onRemoveComment={onRemoveComment}
            />
          </div>
        )}
      </div>

      <div className="space-y-2 ml-8">
        {(comment.attachments ?? []).map((attachment) => (
          <AttachmentItem
            key={attachment.id}
            attachment={attachment}
            isOwner={comment.isOwner}
          />
        ))}
      </div>
    </div>
  );
};

export { CommentItem };
