'use client';

import { useState } from 'react';
import { parseReceipt } from '../actions';

// We can infer the type from our Zod schema if we exported it, 
// but for simplicity, we'll define a quick interface here for the UI state.
interface ReceiptData {
  storeName: string;
  date: string;
  items: { name: string; quantity: number; price: number; totalPrice: number }[];
  subtotal: number;
  tax: number | null;
  total: number;
}

export default function ReceiptParser() {
  const [input, setInput] = useState('');
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(false);

  const exampleText = "Received from WalMart Supercenter on Jan 24, 2026. bought 2 gallons of milk for 3.50 each, a loaf of bread for 2.99, and a pack of gum for 1.25. Subtotal came to 11.24. Tax was 0.90. Total paid 12.14. Thanks for shopping!";

  const handleUseExample = () => {
    setInput(exampleText);
  };

  async function handleSubmit() {
    if (!input) return;
    setLoading(true);
    try {
      const data = await parseReceipt(input);
      setReceiptData(data);
    } catch (error) {
      console.error(error);
      alert('Failed to parse receipt.');
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen p-12 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">🧾 Receipt Parser</h1>

      {/* Input Section */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Example Hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-2">💡 Example receipt text:</p>
              <p className="text-sm text-blue-800 font-mono bg-white p-3 rounded border border-blue-200 break-words">
                {exampleText}
              </p>
            </div>
            <button
              onClick={handleUseExample}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition whitespace-nowrap"
            >
              Use Example
            </button>
          </div>
        </div>

        <textarea
          className="w-full h-40 p-4 border rounded-lg text-black"
          placeholder="Paste your messy receipt text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Parse Receipt'}
        </button>
      </div>

      {/* Output Section */}
      {receiptData && (
        <div className="bg-gray-50 p-6 rounded-lg border shadow-sm text-black">
          <div className="flex justify-between items-end mb-4 border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold">{receiptData.storeName}</h2>
              <p className="text-gray-500">{receiptData.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold text-green-600">
                ${receiptData.total.toFixed(2)}
              </p>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-2">Item</th>
                <th className="py-2 text-center">Qty</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-2 text-right">${item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 pt-4 border-t flex flex-col items-end gap-1">
            <div className="flex justify-between w-48 text-sm">
              <span>Subtotal:</span>
              <span>${receiptData.subtotal.toFixed(2)}</span>
            </div>
            {receiptData.tax !== null && (
              <div className="flex justify-between w-48 text-sm">
                <span>Tax:</span>
                <span>${receiptData.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between w-48 font-bold mt-2">
              <span>Total:</span>
              <span>${receiptData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
