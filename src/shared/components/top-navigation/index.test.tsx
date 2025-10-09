import { render, screen } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import { Calendar, Rewind } from 'lucide-react';
import { TopNavigation } from './index';
import { TabProps } from '@/shared/types/top-navigation';

vi.mock('./tab-button', () => ({
  TabButton: ({ isActive, children }: { isActive: boolean; children: React.ReactNode }) => (
    <button data-testid="tab-button" data-active={isActive}>
      {children}
    </button>
  ),
}));

describe('TopNavigation', () => {
  const mockItems: TabProps[] = [
    { id: 0, label: 'Tab 1', icon: Calendar, withTurn: false, component: () => <div>Tab 1</div> },
    { id: 1, label: 'Tab 2', icon: Rewind, withTurn: true, component: () => <div>Tab 2</div> },
    { id: 2, label: 'Tab 3', icon: Calendar, withTurn: false, component: () => <div>Tab 3</div> },
  ];
  const mockSetTabActive = vi.fn();

  it('should render all tabs when turnIsActive is false', () => {
    render(
      <TopNavigation setTabTaskActive={mockSetTabActive} tabTaskActive={0} turnIsActive={false} items={mockItems} />,
    );

    const buttons = screen.getAllByTestId('tab-button');
    expect(buttons).toHaveLength(2); // tab 1 e tab 3
    expect(buttons[0]).toHaveTextContent('Tab 1');
    expect(buttons[1]).toHaveTextContent('Tab 3');
  });

  it('should apply active state to the correct tab', () => {
    render(
      <TopNavigation setTabTaskActive={mockSetTabActive} tabTaskActive={2} turnIsActive={false} items={mockItems} />,
    );

    const buttons = screen.getAllByTestId('tab-button');
    expect(buttons[0]).toHaveAttribute('data-active', 'false');
    expect(buttons[1]).toHaveAttribute('data-active', 'true');
  });
});
