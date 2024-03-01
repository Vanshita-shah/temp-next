import { v2 as cloudinary } from "cloudinary";
//cloudinary configuration
cloudinary.config({
  cloud_name: "dkv3rw7vg",
  api_key: "128217687539452",
  api_secret: "ZYjZGLE_Po18b6rQsRq0aXnaS6s",
});

// Image file upload to cloudinary in user-profiles folder
export const uploadProfileToCloudinary = async (file: string, name: string) => {
  const uploadResponse = await cloudinary.uploader.upload(file, {
    folder: "user-profiles",
    public_id: `${name}`,
  });

  return uploadResponse.secure_url;
};

export const uploadPhotoToCloudinary = async (file: string, name: string) => {
  const uploadResponse = await cloudinary.uploader.upload(file, {
    folder: "course-images",
    public_id: `${name}`,
  });
  return uploadResponse.secure_url;
};

export const deletePhotoFromCloudinary = async (name: string) => {
  console.log("NAME IS: ", name);

  cloudinary.uploader.destroy(`course-images/${name}`, function (result) {
    console.log(result);
  });
};
