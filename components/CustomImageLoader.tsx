"use client"

import { PhotoInterface } from "@/app/(landing)/about/page";
import Image from "next/image";
import React from "react";
import bluredImage from '@/public/images/blur.jpg';

const CustomImageLoader = ({ photo }: { photo: PhotoInterface }) => {
  const imageloader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    qualtiy: number;
  }) => {
    return "https://via.placeholder.com/150/" + src;
  };

  return (
    <Image
      loader={imageloader}
      src={photo.thumbnailUrl.split("/").pop()}
      width={1200}
      height={1200}      
      quality={200}
      placeholder="blur"
      blurDataURL={bluredImage.blurDataURL}
      alt={photo.title}
    />
  );
};

export default CustomImageLoader;
