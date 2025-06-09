import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  const { slug } = req.query;

  const { data, error } = await supabase
    .from('links')
    .select('url')
    .eq('slug', slug)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Link not found' });
  return res.status(200).json({ url: data.url });
}