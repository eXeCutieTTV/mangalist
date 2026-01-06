import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/mal/anime/:id", async (req, res) => {
  const id = req.params.id;

  const malRes = await fetch(
    `https://api.myanimelist.net/v2/anime/${id}?fields=alternative_titles`,
    {
      headers: {
        "X-MAL-CLIENT-ID": process.env.MAL_CLIENT_ID
      }
    }
  );

  const data = await malRes.json();
  res.json(data);
});

app.listen(3000);
