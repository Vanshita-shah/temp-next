import imageType from "image-type";
import { uploadPhotoToCloudinary, uploadProfileToCloudinary } from "./config";

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

export const convertProfileToURL = async (image: File) => {
  const base64File = await convertImageToBase64(image);
  //get image url from cloudinary
  const imageURL = await uploadProfileToCloudinary(base64File);

  return imageURL;
};

export const convertImageToURL = async (image: File) => {
  const base64File = await convertImageToBase64(image);
  //get image url from cloudinary
  const imageURL = await uploadPhotoToCloudinary(base64File);

  return imageURL;
};
