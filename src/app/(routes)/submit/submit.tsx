"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineAddPhotoAlternate as PhotoIcon } from "react-icons/md";
import { toast } from "sonner";

import Container from "@/components/container";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/post.actions";
import { useUploadThing } from "@/lib/utils/uploadthing";

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
        {!photoPreview && (
          <form noValidate className="w-full">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-14 text-neutral-600 transition hover:opacity-70 md:p-24">
              <PhotoIcon size={50} />

              <h3 className="text-md whitespace-nowrap font-semibold md:text-lg">
                Select a photo
              </h3>

              <input
                type="file"
                name="image"
                accept="image/*"
                multiple={false}
                aria-label="Select a photo"
                onChange={(e) => handlePhotoChange(e)}
                className="hidden"
              />
            </label>
          </form>
        )}

        {/* Display the image preview if available */}
        {photoPreview && (
          <div className="flex flex-col items-center justify-center gap-y-5">
            <Image
              src={photoPreview}
              alt="Image Preview"
              priority
              width={500}
              height={500}
            />
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex w-full flex-col items-center gap-y-5"
            >
              <Input
                type="text"
                name="tags"
                aria-label="Tags"
                placeholder="Add a tag (separate each tag with a comma)"
                onChange={handleTagsChange}
                className="text-xs"
              />
              <Button aria-label="Post" className="w-full">
                {!isLoading ? "Post" : <Spinner />}
              </Button>
            </form>
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => setPhotoPreview("")}
              className="w-full"
            >
              Delete photo
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Submit;
