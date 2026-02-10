require("dotenv").config();
console.log("GROQ KEY:", process.env.GROQ_API_KEY);
const express = require("express");
const app = express();

const { processLogic } = require("./logic");
const { OFFICIAL_EMAIL } = require("./constants");

app.use(express.json());

app.post("/bfhl", async (req, res) => {
  const body = req.body || {};
  const keys = Object.keys(body);

  if (keys.length !== 1) {
    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      data: "Request must contain exactly one key"
    });
  }

  const key = keys[0];
  const value = body[key];

  try {
    const result = await processLogic(key, value);

    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      data: error.message
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});