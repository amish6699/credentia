import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  // 🛡️ Secure, hardcoded prompt
  const prompt = `Generate exactly one unique username and one strong 12-character password. 
Respond only in this format:
Username: {username}
Password: {password}
Do not include any extra text or explanation.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const result = await response.json();
    console.log("🔍 Gemini API Response:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("❌ Gemini API Error:", result.error);
      return res.status(500).json({ error: result.error.message || 'Unknown Gemini API error' });
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
