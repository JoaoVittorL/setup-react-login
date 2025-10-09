import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import { TabButton } from './tab-button';
import { Calendar } from 'lucide-react';

vi.mock('lucide-react', () => ({
  Calendar: () => <svg data-testid="calendar-icon" />,
}));

describe('TabButton', () => {
  it('should render the label and icon', () => {
    render(
      <TabButton isActive={false} onClick={() => {}} icon={Calendar}>
        Minha Aba
      </TabButton>,
    );

    expect(screen.getByText('Minha Aba')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
  });

  it('should apply the active class when isActive is true', () => {
    render(
      <TabButton isActive={true} onClick={() => {}} icon={Calendar}>
        Minha Aba
      </TabButton>,
    );

    const button = screen.getByRole('button', { name: /Minha Aba/i });
    expect(button).toHaveClass('text-white-500');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <TabButton isActive={false} onClick={handleClick} icon={Calendar}>
        Minha Aba
      </TabButton>,
    );

    const button = screen.getByRole('button', { name: /Minha Aba/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
