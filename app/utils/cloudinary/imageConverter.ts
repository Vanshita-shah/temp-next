import imageType from "image-type";
import { uploadPhotoToCloudinary, uploadProfileToCloudinary } from "./config";
import { File } from "buffer";

// Logic to convert File into bas64 string format that cloudinary accepts
const convertImageToBase64 = async (image: File) => {
  const imageReader = image.stream().getReader();
  const imageDataU8: number[] = [];
  while (true) {
    const { done, value } = await imageReader.read();
    if (done) break;

    imageDataU8.push(...value);
  }

  const uint8Array = new Uint8Array(imageDataU8);
  const imageBinary = Buffer.from(uint8Array.buffer);
  const mimetype = await imageType(imageBinary);

  const base64Img = imageBinary.toString("base64");
  const base64File = `data:${mimetype?.mime};base64,` + base64Img;
  return base64File;
};

// Converting Base64 URL string into File  object
export const dataURLtoFile = (dataurl: string, filename: string) => {
  if (!dataurl) {
    return new File([], "undefined", { type: undefined });
  }
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// For user profile photo
export const convertProfileToURL = async (base64: string, name: string) => {
  //get image url from cloudinary
  const imageURL = await uploadProfileToCloudinary(base64, name);

  return imageURL;
};

// For course thumbnail
export const convertImageToURL = async (base64: string, name: string) => {
  //get image url from cloudinary
  const imageURL = await uploadPhotoToCloudinary(base64, name);

  return imageURL;
};
