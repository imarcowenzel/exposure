"use client";

import { MdOutlineAddPhotoAlternate as PhotoIcon } from "react-icons/md";

interface SelectPhotoFormProps {
  onChange: ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectPhotoForm: React.FC<SelectPhotoFormProps> = ({ onChange }) => {
  return (
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
          onChange={(e) => onChange(e)}
          className="hidden"
        />
      </label>
    </form>
  );
};

export default SelectPhotoForm;
