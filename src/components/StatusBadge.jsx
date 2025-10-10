import React from 'react';
import s from './StatusBadge.module.css';

export default function StatusBadge({ status }) {
  const norm = String(status || '').toUpperCase();
  let cls = s.badge;
  if (norm === 'NEW') cls += ' ' + s.new;
  else if (norm === 'MATCHED') cls += ' ' + s.matched;
  else if (norm === 'PICKUP_STARTED') cls += ' ' + s.started;
  else if (norm === 'COMPLETED') cls += ' ' + s.completed;
  else if (norm === 'CANCELLED') cls += ' ' + s.cancelled;
  return <span className={cls}>{norm || 'UNKNOWN'}</span>;
}
