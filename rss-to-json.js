const express = require('express');
const Parser = require('rss-parser');
const parser = new Parser();

const app = express();
const port = process.env.PORT || 50110;

app.use(function (req, res, next) {
  // Set CORS headers to allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
  if (req.query.feedURL) {
    const feedURL = req.query.feedURL;
    try {
      console.log(`Fetching and parsing RSS feed from: ${feedURL}`);
      const rss = await parser.parseURL(req.query.feedURL);
      console.log('RSS feed parsed successfully.');
      res.json(rss);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching or parsing the RSS feed.' });
    }
  } else {
    res.status(400).json({ error: 'feedURL is required' });
  }
});

app.listen(port, () => {
  console.log(`Node app is running on port ${port}`);
});


