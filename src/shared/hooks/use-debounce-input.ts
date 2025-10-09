import { useState, useEffect } from 'react';

/**
 * Hook para debouncing de um valor.
 * Retorna um valor que só é atualizado após um atraso especificado desde a última mudança.
 *
 * @param value O valor a ser "debounced".
 * @param delay O atraso em milissegundos para o debounce.
 * @returns O valor "debounced".
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value); //

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
