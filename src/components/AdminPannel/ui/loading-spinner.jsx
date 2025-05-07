import React from 'react';
import { cn } from '@/lib/utils';

export function LoadingSpinner({ size = "md", className }) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4"
  };

  return (
    <div className={cn(
      "animate-spin rounded-full border-solid border-blue-600 border-t-transparent",
      sizeClasses[size],
      className
    )}></div>
  );
} 