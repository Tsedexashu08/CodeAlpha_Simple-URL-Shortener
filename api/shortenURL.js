const { createClient } = require("@supabase/supabase-js");
const shortid = require("shortid");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const { url } = req.body && req.body.url ? req.body : JSON.parse(req.body || "{}");
  if (!url) return res.status(400).json({ error: "URL required" });
  const { data, error } = await supabase
    .from("urls")
    .insert({ URL: url, ShortenedUrl: shortid.generate() });
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, data });
};