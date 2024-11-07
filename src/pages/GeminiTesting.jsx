/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Accessing API key from environment variable

const GeminiTesting = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null); // State for storing the image data URL

  const fileToGenerativePart = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve({
          inlineData: {
            data: reader.result.split(',')[1], // Extract base64 encoded image data
            mimeType: file.type
          }
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const fetchDataFromGeminiProVisionAPI = async () => {
    try {
      if (!question) {
        alert("Please enter a question!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const fileInputEl = document.querySelector("input[type=file]");
      const imageParts = await Promise.all(
        [...fileInputEl.files].map(fileToGenerativePart)
      );
      const result = await model.generateContent([question, ...imageParts]);
      const text = result.response.text();

      setLoading(false);
      setAnswer(text);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiProVisionAPI error: ", error);
      alert("Error fetching data from Gemini Pro Vision API. Please try again later.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please upload an image!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result); // Store the image data URL in the state
    };
  };

  const generateAnswer = () => {
    fetchDataFromGeminiProVisionAPI();
  };

  return (
    <div>
      <h3>GeminiTesting</h3>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        className='border border-gray-800'
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={generateAnswer}>Send</button>
      {loading && <p>Loading...</p>}
      <div>
        <h4>Answer:</h4>
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GeminiTesting;
