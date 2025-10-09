import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { SystemMessage } from './index';

describe('SystemMessage component', () => {
  it('should render the correct status, title, and message', () => {
    render(
      <SystemMessage status={404} title="Page not found" message="The page you are looking for does not exist." />,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });
});
