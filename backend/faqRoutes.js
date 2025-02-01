const express = require('express');
const { getFAQs, createFAQ } = require('./faqController');

const router = express.Router();

// Route to get FAQs
router.get('/faqs', getFAQs);

// Route to create a new FAQ
router.post('/faqs', createFAQ);

module.exports = router;