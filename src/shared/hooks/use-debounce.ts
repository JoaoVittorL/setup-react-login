import { useEffect } from 'react';

export function useDebounce(effect: () => void, delay: number, deps: any[]) {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}
