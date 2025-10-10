import React, { useState } from 'react';
import { Button } from './Button.jsx';

export function Dialog({ triggerLabel, title, children, onConfirm, confirmLabel = 'Confirm' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-4 dark:bg-gray-900">
            <div className="mb-2 text-lg font-semibold">{title}</div>
            <div className="mb-4">{children}</div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => { onConfirm?.(); setOpen(false); }}>{confirmLabel}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
