import { FormEvent, useState } from 'react';

export default function FAQs() {
  const [report, setReport] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <main className="container">
      <h1>FAQs & Support</h1>
      <section>
        <h2>Key Questions</h2>
        <details><summary>How are collectors matched?</summary><p>Nearest collectors see pending posts, and can accept.</p></details>
        <details><summary>How to edit a post?</summary><p>Open your post and use Edit. Edits allowed until matched.</p></details>
        <details><summary>What proof is needed?</summary><p>At least one photo and geotag; optional signature/OTP and short video.</p></details>
        <details><summary>Who sees my data?</summary><p>Admins and matched collectors see post details; proofs visible for transparency.</p></details>
      </section>

      <section>
        <h2>Report issue</h2>
        {submitted ? <div className="alert" role="status">Thanks for the report. We'll review.</div> : (
          <form onSubmit={onSubmit} className="form">
            <label>Describe issue<textarea value={report} onChange={e=>setReport(e.target.value)} required /></label>
            <label>Contact email (optional)<input type="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
            <button className="btn primary" type="submit">Submit</button>
          </form>
        )}
      </section>

      <section>
        <h2>Contact Support</h2>
        <p>Email <a href="mailto:support@example.org">support@example.org</a> or use the chatbot.</p>
      </section>
    </main>
  );
}
