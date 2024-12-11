const axios = require('axios');
require('dotenv').config();

exports.askQuestion = async (req, res) => {
    const { question } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: question,
                max_tokens: 50, // ~140 characters
            },
            {
                headers: { Authorization: `Bearer ${apiKey}` },
            }
        );

        const answer = response.data.choices[0].text.trim();
        res.status(200).json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
