const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();
  const { data, error } = await supabase.from("urls").select("URL").where({ShortenedURL: req.params.ShortenedURL});;
  if (error) return res.status(500).json({ error: error.message });
  return res.redirect(200).json({ data });
};
