// server.js - Save this in your project folder

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Your OpenAI API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI endpoint - this is what your app will call
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt, system = "You are a professional CV writer." } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    });
    
    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ AI Server running on http://localhost:${PORT}`);
});
