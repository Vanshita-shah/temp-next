import { ImageCropModalProps } from "@/types/types";
import React, { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";

const ImageCropModal = ({
  image,
  croppedFileRef,
  setCropData,
  setOpenModal,
}: ImageCropModalProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // croppedImage base64 URL
      const croppedImage = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();

      //setting cropped data, input ref's value and closing the modal
      setCropData(croppedImage);
      if (croppedFileRef.current) croppedFileRef.current.value = croppedImage;
      setOpenModal(false);
    }
  };

  return (
    <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60">
      <div className="flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 ">
        <div className="bg-white p-5 max-w-[300px]  sm:min-w-[350px] h-[300px]  ">
          <Cropper
            src={image}
            className="w-[100%] h-[60%] flex justify-center object-cover items-center"
            // Cropper.js options
            initialAspectRatio={1}
            minCropBoxHeight={50}
            minCropBoxWidth={50}
            zoomable={false}
            guides={false}
            background={false}
            ref={cropperRef}
            viewMode={1}
          />

          <button
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold cursor-pointer px-6 py-2 mt-[50px] disabled:bg-primary-light"
            onClick={getCropData}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
