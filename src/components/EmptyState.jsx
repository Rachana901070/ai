import React from 'react';

export default function EmptyState({ title = 'Nothing here', description }){
  return (
    <div className="empty">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
