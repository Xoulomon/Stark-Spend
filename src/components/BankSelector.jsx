import React from 'react';

const BankSelector = ({ selectedBank, onSelect, banks }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Bank Institution
      </label>
      <select
        value={selectedBank}
        onChange={(e) => onSelect(e.target.value)}
        className="futuristic-input text-white px-4 py-3 rounded-lg w-full focus:outline-none"
        disabled={!banks.length}
      >
        <option value="">Choose bank...</option>
        {banks.map(bank => (
          <option key={bank.code} value={bank.code}>
            {bank.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BankSelector;