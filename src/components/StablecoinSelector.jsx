import React from 'react';
import { useAccount, useBalance } from '@starknet-react/core';
import { CONSTANTS } from '../constants';
import { utils } from '../utils';

const StablecoinSelector = ({ selectedToken, onSelect, balance }) => {
  const { address } = useAccount();
  const { data: tokenBalance } = useBalance({
    address,
    token: selectedToken === 'ETH' ? undefined : CONSTANTS.STABLECOIN_CONTRACTS[selectedToken],
    watch: true
  });

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', decimals: 6 },
    { symbol: 'USDT', name: 'Tether', decimals: 6 },
    { symbol: 'DAI', name: 'Dai', decimals: 18 },
    { symbol: 'ETH', name: 'Ethereum', decimals: 18 }
  ];

  const displayBalance = tokenBalance ? utils.fromBaseUnits(tokenBalance.value.toString(), tokenBalance.decimals) : '0';

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Stablecoin
      </label>
      <select
        value={selectedToken}
        onChange={(e) => onSelect(e.target.value)}
        className="futuristic-input text-white px-4 py-3 rounded-lg w-full focus:outline-none"
      >
        {tokens.map(token => (
          <option key={token.symbol} value={token.symbol}>
            {token.symbol} - {token.name}
          </option>
        ))}
      </select>
      {address && (
        <div className="mt-2 text-sm text-gray-400">
          Balance: {utils.formatAmount(displayBalance)} {selectedToken}
        </div>
      )}
    </div>
  );
};

export default StablecoinSelector;