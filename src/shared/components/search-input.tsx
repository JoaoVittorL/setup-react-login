import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/shared/components/ui/input';
import { useSearchInput } from '@/shared/hooks/use-search-input';
import { useSearchParams } from 'react-router-dom';

export function SearchInput() {
  const [_, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSearchParams((state) => {
      const params = new URLSearchParams(state);
      if (value) params.set('name', value);
      else params.delete('name');
      return params;
    });
  };
  const { inputValue, handleChange, setExternalValue } = useSearchInput(searchValue, handleSearch);

  useEffect(() => {
    setExternalValue(searchValue);
  }, [searchValue, setExternalValue]);

  return (
    <div className="relative w-full min-w-[150px] flex-1 sm:max-w-[300px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Pesquisar..."
        className="w-full pl-10"
        value={inputValue}
        onChange={handleChange}
        aria-label="Pesquisar"
      />
    </div>
  );
}
