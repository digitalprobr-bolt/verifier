import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CreditCard, ShoppingCart } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const { credits, amount } = location.state || {};

  if (!credits || !amount) {
    return <Navigate to="/credits" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
                  <p className="text-gray-600">{credits.toLocaleString()} email verification credits</p>
                </div>
                <CreditCard className="h-8 w-8 text-gray-400" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-medium">{credits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per 1,000 credits</span>
                  <span className="font-medium">$1.00</span>
                </div>
                <div className="flex justify-between pt-4 border-t">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-blue-600">${amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Pay with PayPal
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6">
            <div className="text-sm text-gray-500">
              <h3 className="font-medium text-gray-700 mb-2">Payment Information:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Secure payment processing by PayPal</li>
                <li>Credits will be added instantly after payment</li>
                <li>You'll receive a receipt via email</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}