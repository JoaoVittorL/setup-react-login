import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { UseFormRegister } from 'react-hook-form';
import { cn } from '../lib/utils';
import { ErrorValidationMessage } from './message-validation-error';

interface PasswordInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  isLoading?: boolean;
  placeholder?: string;
  errors: any;
}

export const PasswordInput = ({
  label,
  name,
  register,
  isLoading = false,
  placeholder,
  errors,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full space-y-2">
      <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</Label>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          {...register(name)}
          disabled={isLoading}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(errors[name]?.message ? 'border-red-500' : '')}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={togglePasswordVisibility}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          ) : (
            <EyeClosedIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      {errors[name]?.message && <ErrorValidationMessage message={errors[name]?.message} />}
    </div>
  );
};
