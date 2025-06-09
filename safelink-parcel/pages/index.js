import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResult('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      setResult(`${window.location.origin}/redirect?code=${data.shortCode}`);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  }

  return (
    <>
      <link rel="stylesheet" href="/style.css" />
      <main>
        <h1>SafeLink URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your URL here..."
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit">Generate SafeLink</button>
        </form>
        {error && <p className="error">{error}</p>}
        {result && (
          <>
            <p>Here is your shortened URL:</p>
            <pre>{result}</pre>
          </>
        )}
      </main>
    </>
  );
}
