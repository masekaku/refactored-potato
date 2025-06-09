import { useState } from 'react'

export default function Home() {
  const [inputUrl, setInputUrl] = useState('')
  const [result, setResult] = useState('')

  const generateLink = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original_url: inputUrl })
    })
    const data = await res.json()
    setResult(data.short_url)
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Safelink Generator</h1>
      <input
        type="text"
        placeholder="Enter original URL"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={generateLink}>Generate Link</button>
      {result && (
        <p>
          Short Link: <a href={result}>{result}</a>
        </p>
      )}
    </main>
  )
}