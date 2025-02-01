require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const faqRoutes = require('./faqRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// MongoDB
mongoose.connect(process.env.MONGOURL)
.then(() => console.log("MongoDB Connected Successfully!"))
.catch((error) => {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
});
  
app.use('/api', faqRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));