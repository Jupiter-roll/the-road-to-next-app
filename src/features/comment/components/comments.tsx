import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { getComments } from '../queries/get-comments';
import { CommentCreateForm } from './comment-create-form';
import { CommentList } from './comment-list';

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const { list: comments, metadata: commentMetadata } =
    await getComments(ticketId, {
      skip: 0,
      take: 2,
    });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Comment</CardTitle>
          <CardDescription>
            A new comment will be created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommentCreateForm ticketId={ticketId} />
        </CardContent>
      </Card>

      <CommentList
        ticketId={ticketId}
        initialComments={comments}
        {...commentMetadata}
      />
    </>
  );
};

export { Comments };
