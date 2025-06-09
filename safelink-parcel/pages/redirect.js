import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function RedirectPage() {
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (token) {
      fetch(`/api/redirect?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setTimeout(() => {
              window.location.href = data.url
            }, 3000) // Delay 3 detik
          }
        })
    }
  }, [token])

  return (
    <main style={{ padding: 20 }}>
      <h1>Redirecting...</h1>
      <p>Please wait, you will be redirected shortly.</p>
    </main>
  )
}