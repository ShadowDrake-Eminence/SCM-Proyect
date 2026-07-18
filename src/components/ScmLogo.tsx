import React from 'react';

interface ScmLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScmLogo({ className = '', size = 'md' }: ScmLogoProps) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {isSmall ? (
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-black dark:text-white"
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" />
            <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
          <div className="flex flex-col items-start">
            <span className="font-sans font-extralight text-sm tracking-[0.2em] uppercase text-black dark:text-white">
              SCM
            </span>
            <span className="text-[7px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
              Material Creator
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Elegant Minimalist Vector Logo */}
          <div className="mb-6 relative flex items-center justify-center">
            <svg
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-black dark:text-white transition-transform duration-700 hover:rotate-45 ${
                isLarge ? 'w-24 h-24' : 'w-16 h-16'
              }`}
            >
              {/* Outer delicate circle */}
              <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" opacity="0.15" />
              {/* Star-like node network */}
              <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              
              {/* Central element bond */}
              <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              <line x1="10" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              
              <circle cx="60" cy="10" r="4" fill="currentColor" />
              <circle cx="60" cy="110" r="4" fill="currentColor" />
              <circle cx="10" cy="60" r="4" fill="currentColor" />
              <circle cx="110" cy="60" r="4" fill="currentColor" />
              
              {/* Inner core atom */}
              <circle cx="60" cy="60" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="3" fill="currentColor" />
              
              {/* Orbiting ring */}
              <ellipse cx="60" cy="60" rx="42" ry="14" stroke="currentColor" strokeWidth="1" transform="rotate(-30 60 60)" opacity="0.5" />
              <ellipse cx="60" cy="60" rx="42" ry="14" stroke="currentColor" strokeWidth="1" transform="rotate(30 60 60)" opacity="0.5" />
            </svg>
          </div>

          {/* Typography */}
          <h1 
            className={`font-sans font-extralight tracking-[0.3em] uppercase text-black dark:text-white ${
              isLarge ? 'text-4xl md:text-5xl lg:text-6xl mb-2' : 'text-2xl md:text-3xl mb-1'
            }`}
          >
            SCM
          </h1>
          <p 
            className={`font-sans uppercase tracking-[0.4em] text-black/40 dark:text-white/40 ${
              isLarge ? 'text-[10px] md:text-[11px]' : 'text-[9px]'
            }`}
          >
            Software de Creación de Materiales
          </p>
        </div>
      )}
    </div>
  );
}

