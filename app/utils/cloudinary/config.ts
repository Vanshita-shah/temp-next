import { v2 as cloudinary } from "cloudinary";
//cloudinary configuration
cloudinary.config({
  cloud_name: "dkv3rw7vg",
  api_key: "128217687539452",
  api_secret: "ZYjZGLE_Po18b6rQsRq0aXnaS6s",
});

// User Profile upload to cloudinary
export const uploadProfileToCloudinary = async (file: string, name: string) => {
  const uploadResponse = await cloudinary.uploader.upload(file, {
    folder: "user-profiles",
    public_id: `${name}`,
  });

  return uploadResponse.secure_url;
};

// Course thumbnails upload to cloudinary
export const uploadPhotoToCloudinary = async (file: string, name: string) => {
  const uploadResponse = await cloudinary.uploader.upload(file, {
    folder: "course-images",
    public_id: `${name}`,
  });

  return uploadResponse.secure_url;
};

// Deletion of course thumbnail from cloudinary when course is deleted
export const deletePhotoFromCloudinary = async (name: string) => {
  cloudinary.uploader.destroy(`course-images/${name}`);
};
