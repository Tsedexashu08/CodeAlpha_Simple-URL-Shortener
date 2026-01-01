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
app.post("/shortenURL", async (req, res) => {
  await supabase
    .from("urls")
    .insert({ URL: req.body.url, ShortenedUrl: shortId.generate() });
});
app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
