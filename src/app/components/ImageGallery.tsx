"use client";

import React from "react";
import ClientImage from "./ClientImage";

/**
 * 剧照墙组件，展示电影剧照
 */
export default function ImageGallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {images.map((image, index) => (
        <div key={index} className="aspect-video rounded-lg overflow-hidden">
          <ClientImage
            src={image}
            alt={`剧照 ${index + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
