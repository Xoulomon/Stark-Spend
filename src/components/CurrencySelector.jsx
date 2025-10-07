import React from 'react';

const CurrencySelector = ({ selectedCurrency, onSelect, currencies }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Fiat Currency
      </label>
      <select
        value={selectedCurrency}
        onChange={(e) => onSelect(e.target.value)}
        className="futuristic-input text-white px-4 py-3 rounded-lg w-full focus:outline-none"
        disabled={!currencies.length}
      >
        <option value="">Choose currency...</option>
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;