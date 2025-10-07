import React, { useState, useEffect } from 'react';
import { StarknetConfig, publicProvider, argent, braavos, useAccount, useNetwork, useSendTransaction } from '@starknet-react/core';
import { sepolia, mainnet } from '@starknet-react/chains';
import axios from 'axios';

// Import components
import WalletConnect from './components/WalletConnect';
import NetworkSelector from './components/NetworkSelector';
import StablecoinSelector from './components/StablecoinSelector';
import CurrencySelector from './components/CurrencySelector';
import BankSelector from './components/BankSelector';
import AccountInput from './components/AccountInput';
import TradeForm from './components/TradeForm';
import PayoutDisplay from './components/PayoutDisplay';
import TradeButton from './components/TradeButton';

// Import hooks
import { useLayerSwap } from './hooks/useLayerSwap';
import { usePaycrest } from './hooks/usePaycrest';

// Import constants and utils
import { CONSTANTS } from './constants';
import { utils } from './utils';

function AppContent() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  // const { data, isLoading, isError, sendTransaction } = useSendTransaction();

  // API hooks
  const { createSwap, getSwapDetails } = useLayerSwap();
  const { getCurrencies, getInstitutions, verifyAccount, getRate, createOrder } = usePaycrest();

  // UI state
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountIdentifier, setAccountIdentifier] = useState('');
  const [accountName, setAccountName] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');
  const [isFiatMode, setIsFiatMode] = useState(false);
  const [estimatedPayout, setEstimatedPayout] = useState('');
  const [loading, setLoading] = useState(false);
  const [swapData, setSwapData] = useState(null);

  // Load currencies on mount
  useEffect(() => {
    loadCurrencies();
  }, []);

  // Load banks when currency changes
  useEffect(() => {
    if (selectedCurrency) {
      loadBanks();
    }
  }, [selectedCurrency]);

  // Verify account when identifier reaches 10 characters
  useEffect(() => {
    if (accountIdentifier.length >= 10 && selectedBank) {
      verifyAccountDetails();
    }
  }, [accountIdentifier, selectedBank]);

  // Calculate payout when amount changes
  useEffect(() => {
    if (tradeAmount && selectedToken && selectedCurrency) {
      calculatePayout();
    }
  }, [tradeAmount, selectedToken, selectedCurrency]);

  const loadCurrencies = async () => {
    try {
      const data = await getCurrencies();
      setCurrencies(data);
    } catch (err) {
      console.error('Failed to load currencies:', err);
    }
  };

  const loadBanks = async () => {
    try {
      const data = await getInstitutions(selectedCurrency);
      setBanks(data);
    } catch (err) {
      console.error('Failed to load banks:', err);
      setBanks([]);
    }
  };

  const verifyAccountDetails = async () => {
    try {
      const name = await verifyAccount(selectedBank, accountIdentifier);
      setAccountName(name);
    } catch (err) {
      console.error('Failed to verify account:', err);
      setAccountName('');
    }
  };

  const calculatePayout = async () => {
    if (!tradeAmount) return;

    try {
      let cryptoAmount = tradeAmount;
      if (isFiatMode) {
        // Convert fiat to crypto using current rate
        const rate = await getRate(selectedToken, 1, selectedCurrency);
        cryptoAmount = (parseFloat(tradeAmount) / parseFloat(rate)).toString();
      }

      // Create swap to get min receive amount
      const swap = await createSwap({
        source_token: selectedToken,
        destination_token: selectedToken,
        amount: cryptoAmount,
        network: chain?.id || CONSTANTS.DEFAULT_NETWORK
      });

      setSwapData(swap);

      // Get rate for the min receive amount
      const payoutRate = await getRate(selectedToken, swap.quote.min_receive_amount, selectedCurrency);
      const payout = parseFloat(swap.quote.min_receive_amount) * parseFloat(payoutRate);
      setEstimatedPayout(payout.toString());
    } catch (err) {
      console.error('Failed to calculate payout:', err);
      setEstimatedPayout('');
    }
  };

  const handleTrade = async () => {
    if (!address || !swapData || !estimatedPayout) return;

    setLoading(true);
    try {
      // Get swap details with call_data
      const swapDetails = await getSwapDetails(swapData.id);

      // Prepare calls for Starknet execute
      const callData = swapDetails.deposit_actions[0].call_data;
      const calls = [{
        contractAddress: utils.decimalToHex(callData.contract_address, 64),
        entrypoint: callData.entrypoint,
        calldata: callData.calldata.map(item => utils.decimalToHex(item, 0))
      }];

      // Execute transaction on Starknet
      const tx = await sendTransaction({
        calls: [{
          contractAddress: utils.decimalToHex(callData.contract_address, 64),
          entrypoint: callData.entrypoint,
          calldata: callData.calldata.map(item => utils.decimalToHex(item, 0))
        }]
      });

      console.log('Starknet transaction executed:', tx?.transaction_hash);

      // Call server to complete the Base trade
      const response = await axios.post(`${CONSTANTS.API_BASE_URL}/api/complete-base-trade`, {
        swapId: swapData.id,
        token: selectedToken,
        currency: selectedCurrency,
        bankCode: selectedBank,
        accountIdentifier: accountIdentifier,
        accountName: accountName
      });

      console.log('Base trade completed:', response.data);

      alert('Trade completed successfully! Tx Hash: ' + response.data.txHash);
    } catch (err) {
      console.error('Trade failed:', err);
      alert('Trade failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-orbitron font-bold text-neon-blue mb-4 neon-text">
            STARK SPEND
          </h1>
          <p className="text-gray-300 text-lg font-exo">
            Bridge your stablecoins from Starknet to fiat currencies
          </p>
        </div>

        {/* Main Card */}
        <div className="holographic-display shadow-neon-blue/20">
          {/* Wallet Connection */}
          <WalletConnect />

          {address && (
            <>
              {/* Network Selection */}
              <NetworkSelector />

              {/* Stablecoin Selection */}
              <StablecoinSelector
                selectedToken={selectedToken}
                onSelect={setSelectedToken}
              />

              {/* Currency Selection */}
              <CurrencySelector
                selectedCurrency={selectedCurrency}
                onSelect={setSelectedCurrency}
                currencies={currencies}
              />

              {/* Bank Selection */}
              <BankSelector
                selectedBank={selectedBank}
                onSelect={setSelectedBank}
                banks={banks}
              />

              {/* Account Input */}
              <AccountInput
                value={accountIdentifier}
                onChange={setAccountIdentifier}
                accountName={accountName}
                loading={loading}
              />

              {/* Trade Amount */}
              <TradeForm
                amount={tradeAmount}
                onAmountChange={setTradeAmount}
                isFiatMode={isFiatMode}
                onToggleMode={() => setIsFiatMode(!isFiatMode)}
                selectedToken={selectedToken}
                selectedCurrency={selectedCurrency}
              />

              {/* Payout Display */}
              <PayoutDisplay
                amount={estimatedPayout}
                currency={selectedCurrency}
                loading={loading}
              />

              {/* Trade Button */}
              <TradeButton
                onClick={handleTrade}
                loading={loading}
                disabled={!address || !selectedCurrency || !selectedBank || !accountIdentifier || !tradeAmount || !accountName}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Powered by Starknet</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={publicProvider()}
      connectors={[argent(), braavos()]}
      autoConnect
    >
      <AppContent />
    </StarknetConfig>
  );
}

export default App;