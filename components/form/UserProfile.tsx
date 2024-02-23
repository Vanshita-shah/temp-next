"use client";

// Work in Progress
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const UserProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Reads the selected file and sets the image data URL
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    // triggering click event of hidden input field
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        id="profile"
        name="profile"
        required
        onChange={handleFileChange}
        ref={inputFileRef}
        hidden
      />
      {/* preview of profile */}
      {image ? (
        <Image
          className="inline-block h-[50px] w-[50px] rounded-full ring-2 ring-white"
          src={image}
          onClick={handleImageClick}
          alt=""
          width={50}
          height={50}
        />
      ) : (
        // Default preview
        <div
          className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
          onClick={handleImageClick}
        >
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default UserProfile;
