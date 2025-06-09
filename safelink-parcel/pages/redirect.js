import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { slug } = router.query;
    if (!slug) return;

    fetch(`/api/resolve?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data?.url) {
          setTimeout(() => {
            window.location.href = data.url;
          }, 3000); // delay 3 detik
        }
      });
  }, [router]);

  return (
    <main>
      <h2>Redirecting you to destination...</h2>
      <p>Mohon tunggu sebentar...</p>
    </main>
  );
}