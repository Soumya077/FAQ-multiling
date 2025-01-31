require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const FAQ = require('./models/FAQ');
const redis = require('redis');
const translate = require('google-translate-api');

const app = express();
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch((error) => {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
});
  

app.listen(3000, () => console.log('Server running on http://localhost:3000'));