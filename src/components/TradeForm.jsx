import React from 'react';

const TradeForm = ({
  amount,
  onAmountChange,
  isFiatMode,
  onToggleMode,
  selectedToken,
  selectedCurrency
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-300">
          Trade Amount
        </label>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${isFiatMode ? 'text-gray-400' : 'text-white'}`}>
            {selectedToken}
          </span>
          <button
            onClick={onToggleMode}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFiatMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
          </button>
          <span className={`text-sm ${isFiatMode ? 'text-white' : 'text-gray-400'}`}>
            {selectedCurrency}
          </span>
        </div>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="futuristic-input text-white px-4 py-3 rounded-lg w-full focus:outline-none"
        placeholder={`Enter amount in ${isFiatMode ? selectedCurrency : selectedToken}...`}
        min="0"
        step="0.01"
      />
    </div>
  );
};

export default TradeForm;