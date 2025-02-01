const { translate } = require('@vitalets/google-translate-api');

const translateText = async (text, lang) => {
  try {
    const res = await translate(text, { to: lang });
    return res.text;
  } catch (err) {
    console.error('Translation error:', err);
    return text;
  }
};

// translateText("Hello", "hi").then(console.log).catch(console.error);

module.exports = translateText;