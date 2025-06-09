import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { original_url } = req.body
  const token = Math.random().toString(36).substr(2, 8)

  const { error } = await supabase
    .from('links')
    .insert([{ token, original_url }])

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({
    short_url: `${process.env.NEXT_PUBLIC_SITE_URL}/redirect?token=${token}`
  })
}