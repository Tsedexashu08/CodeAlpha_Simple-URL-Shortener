const express = require("express");
const path = require("path");
const app = express();
const supabase = require("./supabaseClient");
const PORT = process.env.PORT || 3000;
const shortId = require("shortid");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
const page = path.join(__dirname, "index.html");

app.get("/", (req, res) => {
  res.sendFile(page);
});

app.get("/urls", async (req, res) => {
    const { data, error } = await supabase.from("urls").select("*");
    if (error) {
        return res.status(500).send("Error fetching from database");
    }
    res.json(data);
});

app.post("/shortenURL", async (req, res) => {
  if (!req.body.url) {
    return res.status(400).send("URL is required");
  } else {
    const shortUrl = shortId.generate();
    const {data ,error} = await supabase
      .from("urls")
      .insert({ URL: req.body.url, ShortenedUrl: shortUrl });
    if(error){
      return res.status(500).send("Error saving to database");
    }
    res.json({ URL: req.body.url, ShortenedUrl: shortUrl });
  }
});

app.get("/:shortenedUrl", async (req, res) => {
    const { shortenedUrl } = req.params;
    const { data, error } = await supabase
        .from("urls")
        .select("URL")
        .eq("ShortenedUrl", shortenedUrl)
        .single();

    if (error || !data) {
        return res.status(404).send("URL not found");
    }

    res.redirect(data.URL);
});

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
