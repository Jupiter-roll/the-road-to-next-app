'use client';

import { format } from 'date-fns';
import { PaperclipIcon } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { AttachmentCreateButton } from '@/features/attachment/components/attachment-create-button';
import { AttachmentItem } from '@/features/attachment/components/attachment-item';
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
  const hasAttachments = !!comment.attachments?.length;
  const showToggles = hasAttachments;

  const [activeToggles, setActiveToggles] = useState<string[]>([]);

  const toggles = showToggles ? (
    <ToggleGroup
      type="multiple"
      size="sm"
      onValueChange={setActiveToggles}
    >
      <ToggleGroupItem value="attachments">
        <PaperclipIcon className="w-4 h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ) : null;

  const attachments = activeToggles.includes('attachments') ? (
    <div className="space-y-2">
      <Separator />

      <h4 className="text-sm text-muted-foreground">Attachments</h4>

      {(comment.attachments ?? []).map((attachment) => (
        <AttachmentItem
          key={attachment.id}
          attachment={attachment}
          isOwner={comment.isOwner}
        />
      ))}
    </div>
  ) : null;

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
        <div className="flex justify-between items-center">
          <p className="whitespace-pre-line">{comment.content}</p>
          {showToggles && toggles}
        </div>

        {attachments}
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
  );
};

export { CommentItem };
