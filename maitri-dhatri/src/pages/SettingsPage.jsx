import React from 'react';
import { useUiStore } from '../stores/ui.js';

export function SettingsPage() {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  return (
    <div>
      <h1 className="mb-3 text-xl font-semibold">Settings</h1>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input id="dark" type="checkbox" checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
          <label htmlFor="dark">Dark theme</label>
        </div>
      </div>
    </div>
  );
}
