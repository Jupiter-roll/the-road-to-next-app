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
  const comments = await getComments(ticketId);

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

      <CommentList initialComments={comments} />
    </>
  );
};

export { Comments };
