import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { AppProviders } from '../providers/AppProviders.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import * as authSvc from '../services/auth.js';

describe('LoginPage', () => {
  it('renders and logs in', async () => {
    const spy = vi.spyOn(authSvc, 'loginAction').mockResolvedValue({ id: 1, role: 'donor' });
    render(
      <BrowserRouter>
        <AppProviders>
          <LoginPage />
        </AppProviders>
      </BrowserRouter>
    );

    const btn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(btn);

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });
});
