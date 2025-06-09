import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  const { token } = req.query

  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('token', token)
    .single()

  if (error || !data) {
    return res.status(404).json({ error: 'Link not found' })
  }

  res.status(200).json({ url: data.original_url })
}