"use client";

import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreatPostForm {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const CreatePostForm: React.FC<CreatPostForm> = ({
  onSubmit,
  onChange,
  isLoading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-full flex-col items-center gap-y-5"
    >
      <Input
        type="text"
        name="tags"
        aria-label="Tags"
        placeholder="Add a tag (separate each tag with a comma)"
        onChange={onChange}
        className="text-xs"
      />
      <Button aria-label="Post" className="w-full">
        {!isLoading ? "Post" : <Spinner />}
      </Button>
    </form>
  );
};

export default CreatePostForm;
