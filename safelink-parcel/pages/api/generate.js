import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    // Insert URL and generate short code
    const { data: existing } = await supabase
      .from('links')
      .select('*')
      .eq('url', url)
      .limit(1)
      .single();

    if (existing) {
      return res.status(200).json({ shortCode: existing.short_code });
    }

    // Generate a short code (6 characters)
    const shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await supabase.from('links').insert({
      url,
      short_code: shortCode,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;

    return res.status(200).json({ shortCode });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
