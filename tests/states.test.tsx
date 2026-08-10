import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '@/app/error';
import Loading from '@/app/loading';
import { EmptyState } from '@/components/content/empty-state';

describe('route boundary states', () => {
  it('announces loading work', () => {
    render(<Loading />);
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
  });

  it('offers a working error retry', () => {
    const reset = vi.fn();
    render(<ErrorBoundary error={new Error('test')} reset={reset} />);
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(reset).toHaveBeenCalledOnce();
  });

  it('announces an empty evidence collection', () => {
    render(<EmptyState>No claims are available.</EmptyState>);
    expect(screen.getByRole('status')).toHaveTextContent(
      'No claims are available.',
    );
  });
});
