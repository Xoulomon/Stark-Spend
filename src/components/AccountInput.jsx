import React from 'react';

const AccountInput = ({ value, onChange, accountName, loading }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Account Number/Identifier
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="futuristic-input text-white px-4 py-3 rounded-lg w-full focus:outline-none"
        placeholder="Enter account number..."
      />
      {accountName && (
        <div className="mt-2 text-sm text-green-400 fade-in">
          ✓ Account Name: {accountName}
        </div>
      )}
      {loading && (
        <div className="mt-2 text-sm text-blue-400">
          Verifying account...
        </div>
      )}
    </div>
  );
};

export default AccountInput;