require('dotenv').config();

const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Home Page
app.get('/', async (req, res) => {
  res.send('Welcome to Amazon Scraper API!');
});

// Get Product Details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const { data } = await axios.get(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

// Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const { data } = await axios.get(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

// Get Product Offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const { data } = await axios.get(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

// Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const { data } = await axios.get(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
