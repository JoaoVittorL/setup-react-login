import { twMerge } from 'tailwind-merge';

export function getInputClasses(error?: string, additionalClasses: string = '') {
  return twMerge(`border rounded px-3 py-2 ${error ? '!border-red-500' : ''}`, additionalClasses);
}
