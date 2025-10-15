import { Button } from '@/shared/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  lastPage: number;
  onPageChange?: (pageIndex: string) => void;
}

export function Pagination({ pageIndex, lastPage, totalCount, onPageChange }: PaginationProps) {
  const [_, setSearchParams] = useSearchParams();

  const handlePaginate = useCallback(
    (pageIndex: number) => {
      setSearchParams((state) => {
        state.set('page', (pageIndex === 0 ? 1 : pageIndex).toString());
        return state;
      });
      onPageChange?.(pageIndex.toString());
    },
    [setSearchParams, onPageChange],
  );

  return (
    <div className="mt-4 flex w-full items-center justify-between" data-testid="pagination">
      <div>
        <span className="text-sm font-medium dark:text-white">{totalCount} resultados encontrados </span>
      </div>
      {lastPage > 1 && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePaginate(1)}
            variant="outline"
            className={`h-8 w-8 rounded-full p-0 ${pageIndex === 1 ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}
            aria-label="back-to-first-page"
            title="Voltar para primeira página"
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            onClick={() => handlePaginate(pageIndex - 1)}
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            disabled={pageIndex === 1}
            data-testid="prev"
            aria-label="back-prev-page"
            title="Ir para página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <span className="text-sm font-medium dark:text-white">
            {pageIndex} de {lastPage}
          </span>

          <Button
            onClick={() => handlePaginate(pageIndex + 1)}
            variant="outline"
            className="h-8 w-8 rounded-full p-0"
            disabled={pageIndex === lastPage}
            data-testid="next"
            aria-label="to-next-page"
            title="Ir para página seguinte"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            onClick={() => handlePaginate(lastPage)}
            variant="outline"
            className={`h-8 w-8 rounded-full p-0 ${pageIndex === lastPage ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}
            aria-label="go-to-last-page"
            title="Ir para ultima página"
            disabled={pageIndex === lastPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
