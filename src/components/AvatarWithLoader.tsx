import React, { useState } from "react";
import { Avatar } from "./ui/avatar";
import PuffLoader from "react-spinners/PuffLoader";
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
  alt = "",  
  className = "",  
  hasImg = false,
  loading = false,
}: AvatarWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const showImage = !!imageUrl && !error;

  console.log(loaded);

  if (hasImg) {
    return (
      <div className={`${className} relative overflow-hidden bg-muted/20`}>
        {showImage && (
          <img
            src={imageUrl!}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
              }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <PuffLoader
              color="#ffffff"   // Blanco
              loading={!loaded}
              size={60}         // Tamaño del spinner
              speedMultiplier={1.2} // Velocidad
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Avatar className={`${className} bg-blue-primary overflow-hidden relative`}>
      {showImage && (
        <img
          src={imageUrl!}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <PuffLoader
            color="#ffffff"   // Blanco
            loading={!loaded}
            size={50}         // Tamaño del spinner
            speedMultiplier={1.2} // Velocidad
          />
        </div>
      )}

    </Avatar>
  );
}
