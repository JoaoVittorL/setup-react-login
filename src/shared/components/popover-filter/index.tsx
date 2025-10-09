'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/button';

const FilterPopover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        className="flex w-full items-center gap-2 sm:max-w-[240px]"
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filtro personalizado</span>
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[390px] rounded-lg border bg-white-500 p-4 shadow-lg dark:bg-sidebar">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <span className="text-base font-semibold text-gray-700 dark:text-white-500">Filtrar por:</span>
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-muted"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              <X className="h-4 w-4 dark:text-white-500" />
            </Button>
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default FilterPopover;
