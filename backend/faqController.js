const FAQ = require('./models/FAQ')
const translateText = require('./translate');
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.error('Redis Error:', err));
client.connect().catch(console.error);

const getFAQs = async (req, res) => {
    console.log("Received request for FAQs:", req.query);
  
    const { lang } = req.query;
    const cachedFAQs = await client.get(`faqs:${lang}`);
    if (cachedFAQs) {
        console.log("Serving FAQs from cache:", cachedFAQs);
        return res.json(JSON.parse(cachedFAQs)); // Return cached FAQs
    }
  
    try {
      const faqs = await FAQ.find();
      console.log("Fetched FAQs from DB:", faqs);
  
      const translatedFAQs = faqs.map(faq => {
        const translated = faq.getTranslatedText(lang);
        return {
          _id: faq._id,
          question: translated.question,
          answer: translated.answer,
        };
      });
  
      console.log("Translated FAQs:", translatedFAQs);
      res.json(translatedFAQs);
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ message: "Server error" });
    }
};
  
const sanitizeText = (text) => text.replace(/<\/?[^>]+(>|$)/g, ""); 

const createFAQ = async (req, res) => {
    try {
        let { question, answer } = req.body;

        question = sanitizeText(question);
        answer = sanitizeText(answer);

        const newFAQ = new FAQ({ question, answer });

        const languages = ['hi', 'bn']; 
        newFAQ.translations = {}; 

        for (const lang of languages) {
            const translatedQuestion = await translateText(question, lang);
            const translatedAnswer = await translateText(answer, lang);
            newFAQ.translations[lang] = { question: translatedQuestion, answer: translatedAnswer };
        }

        await newFAQ.save();
        return res.status(201).json(newFAQ);
    } catch (err) {
        console.error("Error adding FAQ:", err);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { getFAQs, createFAQ };
