"use client";

import { useState, useRef, useEffect } from "react";

export default function TravelerCard({
  nickname,
  realName,
  imagePath,
  gradient,
  size = "md",
}: {
  nickname: string;
  realName: string;
  imagePath: string;
  gradient: string;
  size?: "md" | "lg";
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle already-cached images (onLoad fires before React attaches)
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  const sizeClasses =
    size === "lg"
      ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
      : "w-20 h-20 sm:w-24 sm:h-24";

  const initialSize =
    size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl";

  return (
    <div className="flex flex-col items-center text-center group">
      <div
        className={`relative ${sizeClasses} rounded-full overflow-hidden ring-2 ring-white/[0.06] group-hover:ring-white/[0.15] transition-all duration-500`}
      >
        {/* Gradient fallback with initial */}
        <div
          className={`absolute inset-0 ${gradient} flex items-center justify-center`}
        >
          <span
            className={`${initialSize} font-bold text-white/60 select-none`}
          >
            {nickname[0].toUpperCase()}
          </span>
        </div>

        {/* Image overlay */}
        {!imgError && (
          <img
            ref={imgRef}
            src={imagePath}
            alt={nickname}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-110`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <p className="font-bold text-base sm:text-lg tracking-tight mt-3">
        {nickname}
      </p>
      <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 font-medium">
        {realName}
      </p>
    </div>
  );
}
