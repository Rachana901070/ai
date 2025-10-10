import React from 'react';
import s from './ConfirmDialog.module.css';

export default function ConfirmDialog({ open, title = 'Confirm', description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className={s.backdrop} role="dialog" aria-modal="true" aria-labelledby="cd-title">
      <div className={s.dialog}>
        <h3 id="cd-title" style={{ marginTop: 0 }}>{title}</h3>
        {description && <p>{description}</p>}
        <div className={s.actions}>
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
