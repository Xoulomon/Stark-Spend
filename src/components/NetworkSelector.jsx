import React from 'react';
import { useNetwork } from '@starknet-react/core';

const NetworkSelector = () => {
  const { chain } = useNetwork();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Network
      </label>
      <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-white">
            {chain?.name || 'Unknown Network'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NetworkSelector;