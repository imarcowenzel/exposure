"use client";

import { Session } from "next-auth";

import Container from "@/components/container";
import { useState } from "react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/actions/post.actions";
import { toast } from "sonner";
import Image from "next/image";
import SelectPhotoForm from "@/components/forms/select-photo-form";
import CreatePostForm from "@/components/forms/create-post-form";
import { Button } from "@/components/ui/button";

type SubmitProps = { session: Session };

const Submit: React.FC<SubmitProps> = ({ session }) => {
  const { user } = session;

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  // Get the 'startUpload' function from 'useUploadThing'
  const { startUpload } = useUploadThing("imageUploader");

  // Get the router instance for navigation
  const router = useRouter();

  // Handle the change event when a user selects a photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileReader = new FileReader();

    // Check if any files were selected
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setPhotoUrl(Array.from(e.target.files));

      // When the FileReader finishes loading the file
      fileReader.onload = () => {
        // Set the image preview with the result as a data URL
        setPhotoPreview(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    }
  };

  // Handle the change event when tags input value changes
  const handleTagsChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    // Split the input value by commas, trim each tag, and convert to lowercase
    const tagsArray = value.split(",").map((tag) => tag.trim().toLowerCase());
    // Update the 'tags' state with the trimmed and lowercase tags array
    setTags([...tagsArray]);
  };

  // Handle the form submit when the user clicks the submit button
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Upload the image data using the 'startUpload' function
      const imgRes = await startUpload(photoUrl);

      console.log(imgRes);

      if (imgRes && imgRes.length > 0 && user) {
        console.log(user);

        const createPostData = {
          imageUrl: imgRes?.[0].url,
          createdBy: user.username,
          profileImage: user.image,
          tags: tags,
          _id: user._id,
          imageKey: imgRes?.[0].key,
        };

        const res = await createPost(createPostData);

        // Check if the POST request was successful
        if (res.success === true) {
          // Display a success toast message
          toast.success(res.message);
          // Navigate to the user's profile page
          router.replace(`/profile/${user._id}`);
          // Refresh the page to show the new post
        }
      }
    } catch (error: any) {
      console.log(error.message);
      // Display an error toast message
      toast.error("Failed to submit the post! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex w-4/5 flex-col items-center justify-center gap-y-5 lg:w-2/4">
        {!photoPreview && <SelectPhotoForm onChange={handlePhotoChange} />}

        {/* Display the image preview if available */}
        {photoPreview && (
          <>
            <div className="flex flex-col items-center justify-center gap-y-5">
              <Image
                src={photoPreview}
                alt="Image Preview"
                priority
                width={500}
                height={500}
              />
              <CreatePostForm
                onChange={handleTagsChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => setPhotoPreview}
                className="w-full"
              >
                Delete photo
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Submit;
