import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { url } = req.body;
  const slug = Math.random().toString(36).substring(2, 8);

  const { error } = await supabase.from('links').insert([{ slug, url }]);
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ slug });
}