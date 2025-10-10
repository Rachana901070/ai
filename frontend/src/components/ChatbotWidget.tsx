import { useState } from 'react';

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="chatbot-button" aria-label="Help and Chatbot" onClick={() => setOpen(true)}>?</button>
      {open && (
        <div className="chatbot-modal" role="dialog" aria-modal="true" aria-label="Chatbot">
          <div className="chatbot-content">
            <header className="chatbot-header">
              <h3>Help & Chatbot</h3>
              <button aria-label="Close" onClick={() => setOpen(false)}>×</button>
            </header>
            <div className="chatbot-body">
              <p>Chatbot coming soon. For now, email: <a href="mailto:support@example.org">support@example.org</a></p>
              <textarea placeholder="Type your question..." rows={4} style={{ width: '100%' }} />
              <button style={{ marginTop: 8 }} disabled>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
