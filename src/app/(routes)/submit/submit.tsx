"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineAddPhotoAlternate as PhotoIcon } from "react-icons/md";
import { toast } from "sonner";
import * as z from "zod";

import Container from "@/components/container";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/post.actions";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { UserType } from "@/types";

const formSchema = z.object({
  tags: z.string().min(2),
});

const Submit = ({ user }: { user: UserType }) => {

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: "",
    },
  });

  const handleSubmit = async () => {
    try {
      const imgRes = await startUpload(photoUrl);

      if (imgRes && imgRes.length > 0 && user) {
        const createPostData = {
          imageUrl: imgRes?.[0].url,
          createdBy: user.username,
          profileImage: user.image,
          tags: tags,
          _id: user._id,
          imageKey: imgRes?.[0].key,
        };

        const res = await createPost(createPostData);

        if (res.success === true) {
          toast.success(res.message);

          router.replace(`/profile/${user._id}`);
        }
      }
    } catch (error: any) {
      toast.error("Failed to submit the post! Please try again.");
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

        {photoPreview && (
          <div className="flex w-full flex-col items-center justify-center gap-y-5">
            <Image
              src={photoPreview}
              alt="Image Preview"
              priority
              loading="eager"
              width={1368}
              height={1368}
            />

            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full flex-col gap-y-4"
              >
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          name="tags"
                          aria-label="Tags"
                          placeholder="Add a tag (separate each tag with a comma)"
                          onChange={({ target: { value } }) => {
                            // Split the input value by commas, trim each tag, and convert to lowercase
                            const tagsArray = value
                              .split(",")
                              .map((tag) => tag.trim().toLowerCase());
                            // Update the 'tags' state with the trimmed and lowercase tags array
                            setTags([...tagsArray]);
                            console.log(tags);
                            field.onChange({ target: { value } });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={form.formState.isSubmitting}
                  variant={"outline"}
                  className="w-full"
                >
                  {!form.formState.isSubmitting ? "Post" : <Spinner />}
                </Button>
              </form>
            </Form>

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
