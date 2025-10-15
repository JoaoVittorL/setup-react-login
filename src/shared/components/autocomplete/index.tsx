import React, { useState, useEffect, useRef, useMemo, forwardRef } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Input } from '../ui/input';

interface Item {
  label: string;
  value: string;
  description?: string;
  role?: string;
  teamId?: string | null;
}

interface AutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  items: Item[];
  value?: Item | null;
  onChange?: (item: Item | null) => void;
  error?: any;
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ items, error, placeholder = 'Digite para pesquisar...', value = null, onChange, disabled, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref && typeof ref === 'function') {
        ref(inputRef.current!);
      } else if (ref && typeof ref === 'object' && ref !== null) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (value) {
        setInputValue(value.label);
      } else {
        setInputValue('');
      }
    }, [value]);

    const filteredItems = useMemo(() => {
      if (!inputValue.trim()) return [];
      const query = inputValue.toLowerCase();
      return items
        .filter((item) => item.label.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query))
        .slice(0, 50);
    }, [items, inputValue]);

    const handleSelect = (item: Item) => {
      setInputValue(item.label);
      setIsOpen(false);
      setHighlightedIndex(-1);
      onChange?.(item);
    };

    const handleClear = () => {
      setInputValue('');
      setIsOpen(false);
      onChange?.(null);
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
            handleSelect(filteredItems[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const highlightMatch = (text: string, query: string) => {
      if (!query.trim()) return text;
      const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'));
      return parts.map((part, index) => {
        const isMatch = part.toLowerCase() === query.toLowerCase();
        return (
          <span key={index} className={isMatch ? 'rounded bg-gray-700 px-1 text-white' : ''}>
            {part}
          </span>
        );
      });
    };

    return (
      <div className="relative w-full">
        <div className="relative">
          <Input
            ref={inputRef}
            error={error}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(-1);
              if (!e.target.value.trim()) {
                onChange?.(null);
                setIsOpen(false);
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (inputValue && filteredItems.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            {...rest}
          />
          <div
            className={`absolute inset-y-0 right-0 mt-2 flex items-start ${isOpen ? 'pointer-events-none' : ''} pr-2 ${disabled ? 'pointer-events-none' : ''}`}
          >
            {inputValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full px-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-white shadow-lg dark:border-gray-500 dark:bg-gray-500"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer border-b px-4 py-3 last:border-b-0 dark:border-gray-400 ${
                    highlightedIndex === index
                      ? 'bg-gray-500 text-white'
                      : 'hover:bg-gray-500 hover:text-white dark:text-white'
                  }`}
                >
                  <div className="text-sm font-medium">{highlightMatch(item.label, inputValue)}</div>
                  {item.description && (
                    <div className="mt-1 text-xs text-gray-500">{highlightMatch(item.description, inputValue)}</div>
                  )}
                </div>
              ))
            ) : inputValue.trim() ? (
              <div className="px-4 py-6 text-center text-gray-500">
                <Search size={20} className="mx-auto mb-2 opacity-50 dark:text-white" />
                <div className="text-sm dark:text-white">Nenhum resultado encontrado</div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';
