import Image from "next/image";
import React from "react";

const Submit = () => {
  return (
    <div className="flex min-h-[calc(100dvh-497px)] w-full flex-col items-center justify-center gap-y-5 py-12 md:min-h-[calc(100dvh-321px)] lg:min-h-[calc(100dvh-256.98px)]">
      <section className="flex w-full flex-col items-center justify-center gap-y-5">
        {/* Display the image preview if available */}
        {/* {photoPreview && (
          <div className="w-3/4 md:w-2/4 lg:w-1/4">
            <Image
              src={photoPreview}
              alt="Image Preview"
              width={500}
              height={500}
              priority
            />
          </div>
        )} */}

        {/* Conditionally render either the select photo form or create post form */}
        {/* {!photoPreview ? (
          <SelectPhotoForm onChange={handlePhotoChange} />
        ) : (
          <CreatePostForm
            onChange={handleTagsChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )} */}
      </section>

      {/* Display the delete button when there's an image preview */}
      <section className="flex w-11/12 items-center justify-center md:w-2/4 lg:w-1/3">
        {/* {photoPreview && (
          <button
            type="button"
            onClick={() => setPhotoPreview}
            className="btnDelete rounded-3xl"
          >
            Delete photo
          </button>
        )} */}
      </section>
    </div>
  );
};

export default Submit;
