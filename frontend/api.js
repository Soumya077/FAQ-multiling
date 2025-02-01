import axios from "axios";

// Base URL of the backend API
const API_URL = "http://localhost:3000/api"; // Adjust with your backend URL

// Fetch FAQs with language parameter
export const getFAQs = async (lang = "en") => {
  try {
    const response = await axios.get(`${API_URL}/faqs`, { params: { lang } });
    console.log("API Response:", response.data);  // Log response
    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
};

// Submit a new FAQ
export const createFAQ = async (faq) => {
  try {
    const response = await axios.post(`${API_URL}/faqs`, faq);
    return response.data;
  } catch (error) {
    console.error("Error creating FAQ:", error);
  }
};