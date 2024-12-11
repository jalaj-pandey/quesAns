import React from 'react';
import QuestionForm from './components/QuestionForm';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100 flex flex-col items-center justify-center px-4">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">
                    Question Answer App
                </h1>
                <p className="text-gray-600 mt-2">
                    Ask anything, get a response in 140 characters or less!
                </p>
            </header>
            <main className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-4">
                <QuestionForm />
            </main>
        </div>
    );
}

export default App;
