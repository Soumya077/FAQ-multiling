const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String },
    // Add more languages as needed
  },
});

FAQSchema.methods.getTranslatedText = function (lang) {
  return this.translations[lang] || { question: this.question, answer: this.answer };
};

module.exports = mongoose.model("FAQ", FAQSchema);