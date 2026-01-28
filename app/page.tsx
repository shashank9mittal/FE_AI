'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-12 max-w-4xl mx-auto font-sans">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Welcome to FE_AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-Powered Receipt Parser
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Transform messy, unstructured receipt text into clean, structured data 
          using the power of artificial intelligence. Extract store names, dates, 
          items, prices, and totals with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/receipt-parser"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition text-lg"
          >
            Try Receipt Parser
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Powered by OpenAI's GPT-4o model for accurate extraction
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Accurate</h3>
            <p className="text-gray-600">
              Quickly parse receipts and extract structured data in seconds
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Structured Output</h3>
            <p className="text-gray-600">
              Get clean JSON data with store info, items, prices, and totals
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
