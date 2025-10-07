import React from 'react';

const PayoutDisplay = ({ amount, currency, loading }) => {
  return (
    <div className="mb-6">
      <div className="holographic-display rounded-lg p-4">
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-2">Estimated Payout</div>
          {loading ? (
            <div className="text-2xl font-bold text-blue-400 pulse-animation">
              Calculating...
            </div>
          ) : amount ? (
            <div className="text-3xl font-bold text-green-400 neon-text">
              {parseFloat(amount).toFixed(2)} {currency}
            </div>
          ) : (
            <div className="text-xl text-gray-500">
              Enter amount to see payout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayoutDisplay;