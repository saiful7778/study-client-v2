"use client";
import cn from "@/lib/utils/cn";
import { IoImageOutline } from "react-icons/io5";
import { ChangeEvent, FC, useId, useState } from "react";
import Button from "./ui/button";

const style = {
  base: "rounded font-semibold cursor-pointer shadow",
  outline: "border hover:text-accent-color",
  size: {
    main: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-2xl",
    },
    image: {
      sm: {
        width: 368,
        height: 207,
      },
      md: {
        width: 432,
        height: 243,
      },
      lg: {
        width: 656,
        height: 369,
      },
    },
    button: {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-1 text-base",
      lg: "px-5 py-2 text-base",
    },
  },
};

interface ImageUploadProps {
  size?: string | undefined;
  onChange: (photo: File) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ size = "md", onChange }) => {
  const inputId = useId();

  const [showImage, setShowImage] = useState<string | undefined>(undefined);
  const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);
  const [img, setImg] = useState<{
    image: File | null;
    name: string | undefined;
    size: string | undefined;
    type: string | undefined;
  }>({
    image: null,
    name: "",
    size: "",
    type: "",
  });

  //functions
  const handleRemoveImage = () => {
    setShowImage(undefined);
    setImg({
      image: null,
      name: "",
      size: "",
      type: "",
    });
  };

  const handleShowImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imageObj = files[0];
      const imageSize = convertFileSize(imageObj.size);
      if (!imageSize) {
        setErrorStatus("File size too much big!");
        return;
      }
      const fileDataType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/x-icon",
      ];
      if (!fileDataType.includes(imageObj.type)) {
        setErrorStatus("This file not supported!");
        return;
      }
      setImg({
        image: imageObj,
        name: imageObj.name,
        size: imageSize,
        type: imageObj.type,
      });
      const localUrl = URL.createObjectURL(imageObj);
      onChange(imageObj);
      setErrorStatus(undefined);
      setShowImage(localUrl);
    }
  };

  return (
    <div className={cn("my-4 w-full space-y-2", style.size.main[size])}>
      <div className="flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-muted-foreground p-4">
        {showImage ? (
          <>
            <figure className="relative overflow-hidden">
              <img
                className="aspect-video object-cover object-center"
                src={showImage}
                alt="uploaded image"
                width={style.size.image[size].width}
                height={style.size.image[size].height}
              />
              <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-end gap-1 bg-gradient-to-b from-transparent via-gray-800/60 to-gray-800/90 p-2 text-xs font-medium">
                <div>Name: {img.name}</div>
                <div>Size: {img.size}</div>
                <div>Type: {img.type}</div>
              </div>
            </figure>
            {errorStatus && (
              <p className="mt-1 text-xs text-red-500">{errorStatus}</p>
            )}
            <Button size="sm" variant="destructive" onClick={handleRemoveImage}>
              Remove
            </Button>
          </>
        ) : (
          // image select show
          <>
            <span>
              <IoImageOutline size={50} />
            </span>
            <h6 className="text-xl font-medium">Choose an image</h6>
            <p className="text-sm text-gray-500">Files: png, jpeg, jpg</p>
            <label htmlFor={inputId}>
              <input
                id={inputId}
                type="file"
                name="imageUpload"
                onChange={handleShowImage}
                accept="image/*"
                hidden={true}
              />
              <div>
                <span
                  className={cn(
                    style.base,
                    style.size.button[size],
                    style.outline,
                  )}
                >
                  Choose image
                </span>
              </div>
            </label>
            <p className="text-sm text-gray-500">Maximum: 5MB</p>
            {errorStatus && (
              <p className="mt-1 text-xs text-red-500">{errorStatus}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function convertFileSize(inputSize: number) {
  if (inputSize > 0 && inputSize <= 1000) {
    return `${inputSize} b`;
  } else if (inputSize <= 1000000) {
    return `${inputSize / 1000} kB`;
  } else if (inputSize > 1000000 && inputSize <= 5000000) {
    return `${inputSize / 1000000} MB`;
  } else {
    return false;
  }
}

export default ImageUpload;
