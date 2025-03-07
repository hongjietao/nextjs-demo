"use client";

import React from "react";

interface ClientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * 客户端图片组件，支持加载失败回退
 */
export default function ClientImage({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder-movie.jpg",
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}
