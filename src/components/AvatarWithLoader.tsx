import React, { useState } from 'react';
import { Avatar } from './ui/avatar';

interface AvatarWithLoaderProps {
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  fallbackEmoji?: string;
  // When true, behave like a plain image container (no Radix Avatar semantics)
  hasImg?: boolean;
}

export function AvatarWithLoader({ imageUrl, alt = 'Avatar', className = '', fallbackEmoji = '😊', hasImg = false }: AvatarWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const showImage = !!imageUrl && !error;

  if (hasImg) {
    return (
      <div className={`${className} relative overflow-hidden`}>
        {showImage && (
          <img
            src={imageUrl!}
            alt={alt}
            className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
        {!loaded && (
          <>
            <div className="absolute inset-0 animate-pulse bg-muted/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-6 w-6 text-blue-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
          </>
        )}
        {!showImage && (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/60 text-sm select-none">
            {fallbackEmoji}
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
          className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      {!loaded && (
        <>
          <div className="absolute inset-0 animate-pulse bg-muted/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        </>
      )}
      {!showImage && (
        <div className="w-full h-full flex items-center justify-center text-white/80 select-none">
          {fallbackEmoji}
        </div>
      )}
    </Avatar>
  );
}
