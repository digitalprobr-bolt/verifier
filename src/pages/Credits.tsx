import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

export default function Credits() {
  const [credits, setCredits] = useState(5000);
  const navigate = useNavigate();
  const pricePerThousand = 1; // $1 per 1000 verifications

  const handleCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCredits(value);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { credits, amount: (credits / 1000) * pricePerThousand } });
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Purchase Credits</h1>
          <p className="text-lg text-gray-600">
            Choose the number of email verifications you need
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Credits (1 credit = 1 verification)
            </label>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={credits}
              onChange={handleCreditChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">
                {credits.toLocaleString()} credits
              </span>
              <span className="text-2xl font-bold text-blue-600">
                ${((credits / 1000) * pricePerThousand).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            
            {credits >= 100000 && (
              <button
                onClick={handleContactUs}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
              >
                Need more credits? Contact us
              </button>
            )}
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <h3 className="font-medium text-gray-700 mb-2">Package Details:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Instant activation after payment</li>
              <li>Valid for 12 months</li>
              <li>Comprehensive email validation</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}