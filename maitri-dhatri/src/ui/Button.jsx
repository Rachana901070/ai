import React from 'react';
import { cn } from '../lib/utils.js';

export function Button({ as: Comp = 'button', className, variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    outline: 'border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  };
  return <Comp className={cn(base, variants[variant], className)} {...props} />;
}
