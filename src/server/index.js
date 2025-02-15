const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Read the JSON files coming to you
app.use(express.json());
app.use(express.static("dist"));

// Require dotenv
require("dotenv").config();

// Get the city function which gets location from geoNames
const { getCityLoc } = require("./getCityLoc");
const { weatherTemp } = require("./weatherTemp");
const { getCityPic } = require("./getCityPic");

// Using cors
app.use(cors());

const port = 8000;

const username = process.env.USERNAME;
const WEATHER_KEY = process.env.WEATHER_KEY;
const pixabay_key = process.env.pixabay_key;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});

app.post("/getCity", async (req, res) => {
  const city = req.body.city;
  const Location = await getCityLoc(city, username);
  return res.send(Location);
});

app.post("/getWeather", async (req, res) => {
  const { lng, lat, remainingDays } = req.body;
  const getWeather = await weatherTemp(lng, lat, remainingDays, WEATHER_KEY);
  return res.send(getWeather);
});

app.post("/getCityPic", async (req, res) => {
  const { city_name } = req.body;
  const getPic = await getCityPic(city_name, pixabay_key);
  return res.send(getPic);
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));