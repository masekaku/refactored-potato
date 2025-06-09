import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Redirect() {
  const router = useRouter();
  const { code } = router.query;
  const [message, setMessage] = useState('Redirecting...');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;

    async function fetchRedirect() {
      try {
        const res = await fetch(`/api/redirect?code=${code}`);
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }
        if (!res.ok) {
          const data = await res.json();
          setError(data.message || 'Link not found');
          setMessage('');
        }
      } catch (e) {
        setError('Failed to redirect');
        setMessage('');
      }
    }

    fetchRedirect();
  }, [code]);

  return (
    <>
      <link rel="stylesheet" href="/style.css" />
      <main>
        <h1>Redirecting...</h1>
        {message && <p>{message}</p>}
        {error && (
          <>
            <p className="error">{error}</p>
            <p>If redirection failed, <a href={`/api/redirect?code=${code}`}>click here</a></p>
          </>
        )}
      </main>
    </>
  );
}
