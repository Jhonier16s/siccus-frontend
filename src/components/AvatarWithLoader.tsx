import React, { useState } from "react";
import { Avatar } from "./ui/avatar";

interface AvatarWithLoaderProps {
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  fallbackEmoji?: string;
  // When true, behave like a plain image container (no Radix Avatar semantics)
  hasImg?: boolean;
  // Force loader overlay regardless of image network state
  loading?: boolean;
}

export function AvatarWithLoader({
  imageUrl,
  alt = "Avatar",
  className = "",
  fallbackEmoji = "😊",
  hasImg = false,
  loading = false,
}: AvatarWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const showImage = !!imageUrl && !error;

  console.log(loading, loaded, showImage);

  if (hasImg) {
    return (
      <div className={`${className} relative overflow-hidden bg-muted/20`}>
        {showImage && (
          <img
            src={imageUrl!}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
        {(!loaded && showImage) || loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-blue-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-primary rounded-full animate-spin"></div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <Avatar className={`${className} bg-blue-primary overflow-hidden relative`}>
      {showImage && (
        <img
          src={imageUrl!}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-12 h-12">
            {/* Outer subtle ring */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-primary/20" />
            {/* Main spinning arc */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-primary animate-spin" />
            {/* Secondary arc for extra flair */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-primary/60 animate-spin [animation-duration:1.5s]" />
            {/* Pulsing center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-primary/90 animate-ping" />
            </div>
          </div>
        </div>
      )}
    </Avatar>
  );
}
