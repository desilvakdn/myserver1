const express = require("express");
const request = require("request");

const app = express();
const API_URL =
  "https://syntaximos.com/?ihc_action=api-gate&ihch=klOxPZlK7Nw5XPMOlMgbhRNQ3gZp8dU1Ev&action=user_get_details&uid=3"; // Replace this URL with your own

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api", (req, res) => {
  request({ url: `${API_URL}` }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: error.message });
    }

    res.json(JSON.parse(body));
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
