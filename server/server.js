const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle question
app.post('/api/question', async (req, res) => {
    const { question } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        // Make request to OpenAI API with the updated model
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',  // Updated model name
                messages: [{ role: 'user', content: question }], // Format for ChatGPT API
                max_tokens: 50,  // Limit the response to ~140 characters
                temperature: 0.7, // Controls randomness (adjust as necessary)
            },
            {
                headers: { Authorization: `Bearer ${apiKey}` },
            }
        );

        // Extract the answer from the OpenAI API response
        const answer = response.data.choices[0].message.content.trim();
        res.status(200).json({ answer }); // Send the answer back to the client
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
