import React from 'react';
import { cn } from '../lib/utils.js';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn('w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-primary-500 dark:bg-gray-900 dark:border-gray-700', className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }) {
  return <label className={cn('block text-sm font-medium mb-1', className)} {...props} />;
}

export function Textarea({ className, ...props }) {
  return <textarea className={cn('w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500 dark:bg-gray-900 dark:border-gray-700', className)} {...props} />;
}
