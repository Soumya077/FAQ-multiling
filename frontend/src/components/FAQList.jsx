import React, { useState, useEffect } from "react";
import { getFAQs } from "../../api";

const FAQList = () => {
  const [faqs, setFAQs] = useState([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const fetchFAQs = async () => {
      const data = await getFAQs(lang);
      console.log(data);
      setFAQs(data);
    };
    fetchFAQs();
  }, [lang]);

  return (
    <div>
      <h2>FAQs</h2>
      <div>
        <select onChange={(e) => setLang(e.target.value)} value={lang}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>
      <ul>
      {faqs.length > 0 ? (
        faqs.map((faq, index) => (
            <div key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
            </div>
        ))
        ) : (
        <p>No FAQs available</p>
        )}
      </ul>
    </div>
  );
};

export default FAQList;
