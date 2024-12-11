import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        setAnswer('');
        try {
            const response = await axios.post('http://localhost:5001/api/question', { question });
            setAnswer(response.data.answer);
        } catch (error) {
            setAnswer('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <textarea
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Get Answer'}
                </button>
            </form>
            {answer && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-semibold text-gray-800">Answer:</h2>
                    <p className="text-gray-700 mt-2">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionForm;
