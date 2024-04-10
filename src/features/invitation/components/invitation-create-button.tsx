'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createInvitation } from '../actions/create-invitation';

type InvitationCreateButtonProps = {
  organizationId: string;
};

const InvitationCreateButton = ({
  organizationId,
}: InvitationCreateButtonProps) => {
  const [open, setOpen] = useState(false);

  const [formState, action] = useFormState(
    createInvitation.bind(null, organizationId),
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      setOpen(false);
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 w-4 h-4" />
          Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a user by email to your organization.
          </DialogDescription>
        </DialogHeader>
        <form ref={ref} action={action}>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input name="email" id="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div />
              <FieldError
                formState={formState}
                name="email"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <SubmitButton label="Invite" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { InvitationCreateButton };
