import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Pagination } from './pagination';

const setSearchParamsMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useSearchParams: () => [{ get: () => '1' }, setSearchParamsMock],
}));

describe('Pagination Component with mocked useSearchParams', () => {
  beforeEach(() => {
    setSearchParamsMock.mockClear();
  });

  it('renders total count and current page', () => {
    render(<Pagination pageIndex={2} totalCount={50} perPage={10} lastPage={5} />);

    expect(screen.getByText(/50 resultados encontrados/i)).toBeInTheDocument();
    expect(screen.getByText(/2 de 5/i)).toBeInTheDocument();
  });

  it('disables prev buttons on first page', () => {
    render(<Pagination pageIndex={1} totalCount={50} perPage={10} lastPage={5} />);

    expect(screen.getByTestId('prev')).toBeDisabled();
    expect(screen.getByLabelText('back-to-first-page')).toBeDisabled();
  });

  it('disables next buttons on last page', () => {
    render(<Pagination pageIndex={5} totalCount={50} perPage={10} lastPage={5} />);

    expect(screen.getByTestId('next')).toBeDisabled();
    expect(screen.getByLabelText('go-to-last-page')).toBeDisabled();
  });

  it('calls onPageChange and setSearchParams with correct page index', () => {
    const onPageChange = vi.fn();
    render(<Pagination pageIndex={3} totalCount={50} perPage={10} lastPage={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByTestId('prev'));
    expect(onPageChange).toHaveBeenCalledWith('2');
    expect(setSearchParamsMock).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('next'));
    expect(onPageChange).toHaveBeenCalledWith('4');

    fireEvent.click(screen.getByLabelText('back-to-first-page'));
    expect(onPageChange).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByLabelText('go-to-last-page'));
    expect(onPageChange).toHaveBeenCalledWith('5');
  });
});
