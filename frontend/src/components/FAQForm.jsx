import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const FAQForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      alert("Both question and answer are required!");
      return;
    }
    await axios.post("http://localhost:3000/api/faqs", { question, answer });
    alert("FAQ created successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <ReactQuill value={answer} onChange={setAnswer} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FAQForm;