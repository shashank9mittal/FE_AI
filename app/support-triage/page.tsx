"use client";

import { useState } from "react";
import { triageSupportTicket } from "./actions";

export default function SupportTriage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // We wrap the server action to handle loading states
  const handleSubmit = async () => {
    setLoading(true);
    // This will trigger the redirect on the server side
    // so this function will likely never "finish" if successful.
    await triageSupportTicket(input);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-12 bg-gray-50 text-black font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border">
        <h1 className="text-2xl font-bold mb-2">🛡️ Support Triage</h1>
        <p className="text-gray-500 mb-6">
          Describe your issue. Our AI will route you to the right department.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., I want my money back..."
          className="w-full h-32 p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !input}
          className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {loading ? "Routing..." : "Submit Ticket"}
        </button>
      </div>
    </main>
  );
}
