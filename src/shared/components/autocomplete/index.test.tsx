import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Autocomplete } from './index';

describe('Autocomplete', () => {
  const items = [
    { label: 'João', value: '1' },
    { label: 'Maria', value: '2' },
    { label: 'Pedro', value: '3' },
  ];

  it('should render placeholder', () => {
    render(<Autocomplete items={items} onChange={() => {}} placeholder="Digite um nome" />);
    const input = screen.getByPlaceholderText('Digite um nome');
    expect(input).toBeInTheDocument();
  });

  it('should filter items based on input value', () => {
    render(<Autocomplete items={items} onChange={() => {}} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'jo' } });

    const names = screen.getAllByText((_, element) => element?.textContent?.includes('João') ?? false);

    expect(names.length).toBeGreaterThan(0);

    fireEvent.click(names[0]);

    const mariaItems = screen.queryAllByText((_, element) => element?.textContent?.includes('Maria') ?? false);

    expect(mariaItems.length).toBe(0);
  });
});
