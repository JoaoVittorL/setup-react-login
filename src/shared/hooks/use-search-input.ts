import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from './use-debounce';

export function useSearchInput(externalValue: string, onSearch: (value: string) => void) {
  const [inputValue, setInputValue] = useState(externalValue);

  useEffect(() => {
    setInputValue(externalValue);
  }, [externalValue]);

  useDebounce(
    () => {
      onSearch(inputValue);
    },
    400,
    [inputValue],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return {
    inputValue,
    handleChange,
    setExternalValue: setInputValue,
  };
}
