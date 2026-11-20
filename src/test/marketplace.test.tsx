import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

describe('AccessKart marketplace', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    window.confirm = vi.fn(() => true);
  });

  it('keeps purchases and rental reservations as distinct persisted cart lines', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { name: 'What would help today?' });

    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]);
    await user.click(screen.getByRole('tab', { name: 'Rent' }));
    await screen.findByRole('heading', { name: 'Rent a little more freedom' });
    await user.click(screen.getAllByRole('button', { name: 'Add rental to cart' })[0]);

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem('accesskart-cart') ?? '[]') as Array<{ type: string; productId: string }>;
      expect(saved).toHaveLength(2);
      expect(saved.map((line) => line.type)).toEqual(['purchase', 'rental']);
    });

    await user.click(screen.getByRole('tab', { name: 'Compare' }));
    await user.click(screen.getByRole('button', { name: /Cart, 2 items/ }));
    expect(await screen.findByRole('heading', { name: 'Purchase order' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Rental order' })).toBeInTheDocument();
  });

  it('caps the comparison list at three products', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { name: 'What would help today?' });
    await user.click(screen.getByRole('tab', { name: 'Shop' }));
    await screen.findByRole('heading', { name: 'Find your kind of support' });

    const compareButtons = screen.getAllByRole('button', { name: 'Compare' });
    await user.click(compareButtons[0]);
    await user.click(compareButtons[1]);
    await user.click(compareButtons[2]);
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem('accesskart-compare') ?? '[]')).toHaveLength(3));
    expect(screen.getAllByRole('button', { name: 'Compare' }).every((button) => (button as HTMLButtonElement).disabled)).toBe(true);

    await user.click(screen.getByRole('tab', { name: 'Compare' }));
    const table = screen.getByRole('table', { name: 'Product comparison' });
    expect(within(table).getAllByRole('columnheader')).toHaveLength(4);
  });

  it('stores font and contrast preferences between page visits', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { name: 'What would help today?' });
    await user.click(screen.getByRole('button', { name: 'Increase text size' }));
    await user.click(screen.getByRole('button', { name: 'Contrast' }));

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem('accesskart-accessibility') ?? '{}') as { fontScale?: number; highContrast?: boolean };
      expect(saved.fontScale).toBe(1.1);
      expect(saved.highContrast).toBe(true);
    });
    expect(document.documentElement).toHaveClass('high-contrast');

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(document.documentElement).not.toHaveClass('high-contrast'));
  });
});
