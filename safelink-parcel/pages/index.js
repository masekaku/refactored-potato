import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  async function generate() {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: input }),
    });

    if (!res.ok) return alert('Gagal membuat link');

    const data = await res.json();
    setResult(`${process.env.NEXT_PUBLIC_SITE_URL}/redirect?slug=${data.slug}`);
  }

  return (
    <main>
      <h1>Safelink Generator</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste link here" />
      <button onClick={generate}>Generate</button>
      {result && <p>🔗 <a href={result} target="_blank">{result}</a></p>}
    </main>
  );
}