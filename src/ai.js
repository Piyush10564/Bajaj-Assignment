const axios = require("axios");

async function askAI(question) {
  if (typeof question !== "string" || question.trim() === "") {
    throw new Error("AI question must be a non-empty string");
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("AI API key not configured");
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
  "You are a factual assistant. Use official capital names. For India, always answer 'New Delhi'. Answer with only the capital city name. No explanation."
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;
    return text.trim();

  } catch (err) {
    console.error("Groq error:", err.response?.data || err.message);
    throw new Error("AI service failed");
  }
}

module.exports = { askAI };