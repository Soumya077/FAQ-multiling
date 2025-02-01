# FAQ Management System

## Overview

The **FAQ Management System** allows users to easily create, manage, and view frequently asked questions (FAQs) in multiple languages. Built using **Node.js**, **MongoDB**, **Express.js**, and **React.js**, this system automatically translates FAQs into different languages and allows users to view them in their preferred language.

The backend uses **Redis** for caching frequently requested FAQs to improve performance, and **Google Translate API** is used for translations.

## Features

- **Create FAQs**: Add new FAQ entries with a question and answer.
- **Multiple Language Support**: Automatically translate FAQ entries into multiple languages such as Hindi, Bengali, etc.
- **View FAQs**: View FAQs in the selected language.
- **Rich Text Support**: Answer text supports rich formatting (HTML).
- **Performance Optimization**: FAQs are cached using **Redis** to improve response times.

## Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose ORM)
  - Redis (for caching)
  - Google Translate API (for translations)
  
- **Frontend**:
  - React.js
  - React Quill (for rich text editor)

## Installation

### Prerequisites

Make sure you have the following installed before setting up the project:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: You can use a local MongoDB instance or a cloud MongoDB provider like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Redis**: Set up a Redis instance (locally or use a cloud service like [Redis Labs](https://redislabs.com/)).

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/faq-management-system.git
   cd faq-management-system
2. **Install the required dependencies**: 
    ```bash
    npm install
3. **Configure Environment Variables**  
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   GOOGLE_API_KEY=your_google_translate_api_key
   ```
3. **Start the Backend Server**  
   Run the following command to start the backend server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

---

### Frontend Setup

1. **Navigate to the Frontend Directory**  
   Move to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**  
   Install the required dependencies:
   ```bash
   npm install
   ```

3. **Start the Frontend Development Server**  
   Run the following command to start the frontend:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

## Running the Full Application

- **Backend (API):** Runs at `http://localhost:3000`.
- **Frontend (React App):** Runs at `http://localhost:5173`.

Ensure both servers are running to interact with the full application.

---

## API Endpoints

### `GET /api/faqs`
- **Description:** Fetch all FAQ entries.
- **Query Params:**
  - `lang` (optional, default: `"en"`): The language code for the FAQ translation (e.g., `en`, `hi`, `bn`).
- **Response:** Returns a list of FAQs in the specified language.

**Example Request:**
```bash
GET /api/faqs?lang=hi
```

**Example Response:**
```json
[
  {
    "_id": "679e1e372e05d8b01ac380c5",
    "question": "What is your deadline?",
    "answer": "12th Feb"
  },
  {
    "_id": "679e524d537756445191ed51",
    "question": "What is MySQL?",
    "answer": "A software tool for managing databases"
  }
]
```

---

### `POST /api/faqs`
- **Description:** Create a new FAQ entry.
- **Request Body:**
  ```json
  {
    "question": "Your question",
    "answer": "Your answer"
  }
  ```
- **Response:** Returns the newly created FAQ.

**Example Request:**
```bash
POST /api/faqs
{
  "question": "What is your deadline?",
  "answer": "The deadline is 12th February."
}
```

**Example Response:**
```json
{
  "_id": "abc123",
  "question": "What is your deadline?",
  "answer": "The deadline is 12th February.",
  "translations": {
    "hi": {
      "question": "आपकी समय सीमा क्या है?",
      "answer": "समय सीमा 12 फरवरी है।"
    },
    "bn": {
      "question": "আপনার ডেডলাইন কী?",
      "answer": "ডেডলাইন ১২ই ফেব্রুয়ারি।"
    }
  }
}
```

---

## How It Works

### Backend Logic
1. **FAQ Creation:**  
   When a new FAQ is created, the question and answer are sanitized to remove unwanted HTML tags.

2. **Translation:**  
   The question and answer are translated into specified languages (e.g., Hindi, Bengali) using the Google Translate API.

3. **Redis Caching:**  
   Frequently requested FAQs are cached in Redis to improve response times.

4. **Serving FAQs:**  
   When a request for FAQs is received, the server checks if the requested language's FAQs are cached. If not, it fetches them from MongoDB, translates them, caches them in Redis, and returns them.

---

### Frontend Logic
1. **FAQ Form:**  
   The frontend provides a form where users can submit new FAQs, with rich text support for the answer section.

2. **FAQ List:**  
   Users can view the list of FAQs in the selected language. A language selector allows users to choose between available languages (e.g., English, Hindi, Bengali).

3. **API Interaction:**  
   The frontend interacts with the backend via API calls to fetch FAQs and submit new ones.
---

## Troubleshooting

1. **FAQ not displaying in frontend:**  
   Ensure both the backend and frontend servers are running. Check the browser's developer console for errors.

2. **Redis issues:**  
   Ensure Redis is running locally or that the Redis cloud connection string is correct in the `.env` file.

---
