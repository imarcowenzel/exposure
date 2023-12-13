import Container from "@/components/container";
import React from "react";

const Submit = () => {
  return (
    <Container>
      <div className="flex w-full flex-col items-center justify-center gap-y-5">
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
      </div>

      {/* Display the delete button when there's an image preview */}
      <div className="flex w-11/12 items-center justify-center md:w-2/4 lg:w-1/3">
        {/* {photoPreview && (
          <button
            type="button"
            onClick={() => setPhotoPreview}
            className="btnDelete rounded-3xl"
          >
            Delete photo
          </button>
        )} */}
      </div>
    </Container>
  );
};

export default Submit;
