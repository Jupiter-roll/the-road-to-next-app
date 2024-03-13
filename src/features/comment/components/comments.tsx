import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { CommentCreateForm } from './comment-create-form';
import { CommentList } from './comment-list';

type CommentsProps = {
  ticketId: string;
};

const Comments = ({ ticketId }: CommentsProps) => {
  return (
    <>
      <CommentList ticketId={ticketId} />

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
    </>
  );
};

export { Comments };
