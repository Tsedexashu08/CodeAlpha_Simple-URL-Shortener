const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();
  const { shortenedUrl } = req.query;
  const { data, error } = await supabase
    .from("urls")
    .select("URL")
    .eq("ShortenedUrl", shortenedUrl)
    .single();

  if (error || !data) {
    console.error("Error fetching URL or URL not found:", error);
    return res.status(404).send("Shortened URL not found.");
  }
  
  console.log(`Redirecting shortenedUrl: ${shortenedUrl} to: ${data.URL}`);
  res.redirect(302, data.URL);
};
