'use client';

import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingTextProps {
  className?: string;
}

export function LoadingText({ className }: LoadingTextProps) {
  const getAnimationDelay = (index: number) => {
    const delays = ['animate-delay-0', 'animate-delay-200', 'animate-delay-400', 'animate-delay-600', 'animate-delay-800'];
    return delays[index];
  };

  return (
    <div className={cn("flex items-center justify-center min-h-[200px]", className)}>
      <div className="relative flex items-center justify-center gap-2 p-8 rounded-xl bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-lg">
        {'AXOVA'.split('').map((letter, index) => (
          <span
            key={index}
            className={cn(
              "text-4xl md:text-6xl font-bold text-black inline-block animate-axova",
              getAnimationDelay(index)
            )}
            style={{
              textShadow: '0 0 10px rgba(0,0,0,0.2)'
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}