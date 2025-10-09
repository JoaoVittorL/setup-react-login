import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterPopover from '.';

describe('FilterPopover', () => {
  it('deve renderizar o botão principal', () => {
    render(
      <FilterPopover>
        <div>Conteúdo do popover</div>
      </FilterPopover>,
    );

    expect(screen.getByText('Filtro personalizado')).toBeInTheDocument();
  });

  it('abre o popover ao clicar no botão', () => {
    render(
      <FilterPopover>
        <div>Conteúdo do popover</div>
      </FilterPopover>,
    );

    const mainButton = screen.getByText('Filtro personalizado');
    fireEvent.click(mainButton);

    expect(screen.getByText('Filtrar por:')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do popover')).toBeInTheDocument();
  });

  it('fecha o popover ao clicar no botão de fechar', () => {
    render(
      <FilterPopover>
        <div>Conteúdo do popover</div>
      </FilterPopover>,
    );

    const mainButton = screen.getByText('Filtro personalizado');
    fireEvent.click(mainButton); // abre

    const closeButton = screen.getByLabelText('Fechar');
    fireEvent.click(closeButton); // fecha

    expect(screen.queryByText('Filtrar por:')).not.toBeInTheDocument();
  });
});
