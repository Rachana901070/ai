import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { AppProviders } from '../providers/AppProviders.jsx';
import { CollectorRequestsPage } from '../pages/collector/CollectorRequestsPage.jsx';
import * as matches from '../services/matches.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Providers({ children }) {
  const qc = new QueryClient();
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('CollectorRequestsPage optimistic accept', () => {
  it('removes item optimistically', async () => {
    vi.spyOn(matches, 'listNearbyRequests').mockResolvedValue([
      { id: 1, type: 'Cooked', qty: 10, location: { lat: 0, lng: 0 } },
    ]);
    vi.spyOn(matches, 'acceptRequest').mockResolvedValue({ ok: true });

    render(
      <BrowserRouter>
        <Providers>
          <CollectorRequestsPage />
        </Providers>
      </BrowserRouter>
    );

    await screen.findByText(/Nearby Requests/i);
    const btn = screen.getByRole('button', { name: /accept/i });
    fireEvent.click(btn);

    await waitFor(() => expect(screen.queryByText(/Cooked/i)).toBeNull());
  });
});
