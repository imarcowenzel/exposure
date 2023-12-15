"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import Modal from "@/components/modal";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  deleteProfilePhoto,
  editProfilePhoto,
} from "@/lib/actions/user.actions";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { UserType } from "@/types";

const ChangePictureForm = ({ user }: { user: UserType }) => {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<File[]>([]);

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const toggleModal = () => {
    setIsModalOpen((prev: boolean) => !prev);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      toggleModal();
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    try {
      // Upload the image data using the 'startUpload' function
      const imgRes = await startUpload(photoUrl);

      if (imgRes?.length === 0) {
        throw new Error("Failed to upload picture!");
      }

      const editProfilePictureData = {
        image: imgRes?.[0].url || "",
        _id: user._id || "",
        imageKey: imgRes?.[0].key || "",
      };

      const res = await editProfilePhoto(editProfilePictureData);

      if (!res?.success) {
        toast.error("Failed to change the picture! Please try again.", {
          duration: 5000,
        });
        return;
      }

      toast.success(res.message);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      toggleModal();
    }
  };

  const handleDeletePicture = async () => {
    try {
      toast.loading("Removing picture...");

      const RemoveProfilePhotoData = {
        _id: user._id,
        image: user.image,
        imageKey: user.imageKey,
      };

      const res = await deleteProfilePhoto(RemoveProfilePhotoData);

      if (!res?.success) {
        throw new Error(res.message);
      }

      setPhotoPreview("");

      toast.dismiss();

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex  items-center justify-center gap-x-6">
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-y-6">
          {!isUploading ? (
            <>
              <div className="relative h-24 w-24 rounded-full">
                {photoPreview && (
                  <Image
                    src={photoPreview}
                    alt="Avatar"
                    fill
                    priority
                    sizes="100svh"
                    className="rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex w-full justify-center gap-x-5">
                <Button
                  disabled={isUploading}
                  variant={"default"}
                  onClick={(e) => handleSubmit(e)}
                >
                  Confirm
                </Button>
                <Button
                  onClick={toggleModal}
                  disabled={isUploading}
                  variant={"destructive"}
                >
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <>
              <Spinner />
              <h1>Changing profile picture...</h1>
            </>
          )}
        </div>
      </Modal>

      <div className="relative h-24 w-24 rounded-full">
        <Image
          src={user.image || "/assets/profile-picture.svg"}
          alt="Avatar"
          fill
          priority
          loading="eager"
          sizes="100svh"
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col items-start gap-y-1">
        <form noValidate className="flex flex-col items-start gap-y-1">
          <label className="cursor-pointer">
            <p className="whitespace-nowrap text-sm font-semibold">
              Change photo
            </p>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple={false}
              aria-label="Select a photo"
              onChange={(e) => {
                handlePictureChange(e);
              }}
              className="hidden"
            />
          </label>
        </form>

        <button
          type="button"
          name="deletePhoto"
          aria-label="Delete Photo"
          onClick={handleDeletePicture}
          className="whitespace-nowrap text-sm font-semibold text-red-500"
        >
          Delete photo
        </button>
      </div>
    </div>
  );
};

export default ChangePictureForm;
