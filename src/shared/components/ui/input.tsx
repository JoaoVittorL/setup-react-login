import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { ErrorValidationMessage } from '../message-validation-error';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          'focus:ring-briborder-gray-200 flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus:border-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <ErrorValidationMessage message={error} />}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
