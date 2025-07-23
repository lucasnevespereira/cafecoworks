"use client";

import Image from "next/image";
import { useState } from "react";

export default function CafeImage({
  cafeImage,
  cafeName,
}: {
  cafeImage: string;
  cafeName: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <Image
        src={cafeImage}
        alt={cafeName}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
      />
    );
  }

  // Fallback placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className="text-8xl mb-4 opacity-40">☕</div>
      <div className="text-lg text-coffee-warm">{cafeName}</div>
    </div>
  );
}
