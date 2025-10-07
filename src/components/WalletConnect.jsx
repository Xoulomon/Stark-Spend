import React from 'react';
import { useConnect, useAccount, useDisconnect, useNetwork } from '@starknet-react/core';

const WalletConnect = ({ onConnect, onDisconnect, address }) => {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address: accountAddress } = useAccount();
  const { chain } = useNetwork();

  const handleConnect = async (connector) => {
    try {
      await connect({ connector });
      if (onConnect) onConnect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    if (onDisconnect) onDisconnect();
  };

  return (
    <div className="mb-6">
      {!accountAddress ? (
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Connect Wallet</h3>
          <div className="grid grid-cols-1 gap-2">
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                className="neon-button text-white px-6 py-3 rounded-lg font-bold text-lg w-full"
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Supported wallets: Argent X, Braavos, Argent Mobile, and other Starknet native wallets
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full pulse-animation"></div>
              <span className="text-white font-semibold">Connected</span>
            </div>
            <span className="text-gray-300 font-mono text-sm">
              {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
            </span>
          </div>
          <div className="text-sm text-gray-400 mb-3">
            Network: {chain?.name || 'Unknown'}
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;