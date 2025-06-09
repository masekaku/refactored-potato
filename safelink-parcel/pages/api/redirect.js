import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: 'Code is required' });
  }

  try {
    const { data, error } = await supabase
      .from('links')
      .select('url')
      .eq('short_code', code)
      .limit(1)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.redirect(data.url);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
