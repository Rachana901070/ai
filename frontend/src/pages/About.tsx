export default function About() {
  return (
    <main className="container">
      <h1>How It Works / About</h1>
      <section className="grid">
        <div className="card">
          <h2>Donors</h2>
          <ol>
            <li>Post surplus food details</li>
            <li>AI matches to collectors</li>
            <li>Pickup and transparency</li>
          </ol>
        </div>
        <div className="card">
          <h2>Collectors</h2>
          <ol>
            <li>See nearby posts</li>
            <li>Accept and navigate</li>
            <li>Upload proof of delivery</li>
          </ol>
        </div>
      </section>
      <section>
        <h2>Impact Stories</h2>
        <p>Real stories from donors, collectors, and NGOs coming soon.</p>
      </section>
    </main>
  );
}
