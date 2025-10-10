import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { AppProviders } from '../providers/AppProviders.jsx';
import { DonationFormPage } from '../pages/donor/DonationFormPage.jsx';
import * as donations from '../services/donations.js';
import * as uploads from '../services/uploads.js';

describe('DonationFormPage', () => {
  it('submits happy path', async () => {
    vi.spyOn(uploads, 'uploadToCloudinary').mockResolvedValue({ url: 'http://image' });
    const createSpy = vi.spyOn(donations, 'createDonation').mockResolvedValue({ id: 123 });

    render(
      <BrowserRouter>
        <AppProviders>
          <DonationFormPage />
        </AppProviders>
      </BrowserRouter>
    );

    const submit = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submit);

    await waitFor(() => expect(createSpy).toHaveBeenCalled());
  });
});
