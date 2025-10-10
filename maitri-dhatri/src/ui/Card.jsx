import React from 'react';
import { cn } from '../lib/utils.js';

export function Card({ className, children }) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn('px-4 py-3 border-b border-gray-200 dark:border-gray-700', className)}>{children}</div>;
}

export function CardContent({ className, children }) {
  return <div className={cn('px-4 py-3', className)}>{children}</div>;
}
