// server.js - Backend server for Starknet Off-Ramp Application

import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { createPublicClient, createWalletClient, http, parseUnits, formatUnits, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('.')); // Serve index.html and other static files

const PORT = process.env.PORT || 3000;

// Constants
const LAYERSWAP_BASE_URL = 'https://api.layerswap.io/api/v2';
const PAYCREST_BASE_URL = 'https://api.paycrest.io/v1';
const BASE_ADDRESS = '0xb39b7c02372dBBb003c05D6b4ABA2eC68842934D';
const SOURCE_NETWORK = 'STARKNET_MAINNET';
const DESTINATION_NETWORK = 'BASE_MAINNET';

const BASE_TOKEN_INFO = {
  USDC: { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
  USDT: { address: '0xfde4C96c8593536E31F209EA5dF9988046bB85e0', decimals: 6 },
  DAI: { address: '0x50c5725949A6F0c72E6C4a641F24049A917eF0Cb', decimals: 18 },
  ETH: { address: null, decimals: 18 }
};

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
];

// Viem clients
const account = privateKeyToAccount(process.env.BASE_PRIVATE_KEY);
const publicClient = createPublicClient({
  chain: base,
  transport: http()
});
const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http()
});

// Utility functions
const handleApiError = (error, customMessage) => {
  console.error(customMessage || 'API Error:', error);
  if (error.response) {
    const status = error.response.status;
    if (status === 400) return 'Invalid request. Please check your input.';
    if (status === 401) return 'Authentication failed. Please check your API key.';
    if (status === 429) return 'Rate limit exceeded. Please try again later.';
    if (status >= 500) return 'Server error. Please try again later.';
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  }
  return 'An unexpected error occurred.';
};

const getBaseBalance = async (token) => {
  const tokenInfo = BASE_TOKEN_INFO[token];
  if (!tokenInfo) throw new Error('Invalid token');

  if (token === 'ETH') {
    const balance = await publicClient.getBalance({ address: BASE_ADDRESS });
    return formatUnits(balance, 18);
  } else {
    const balance = await publicClient.readContract({
      address: tokenInfo.address,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [BASE_ADDRESS]
    });
    return formatUnits(balance, tokenInfo.decimals);
  }
};

const sendOnBase = async (token, amount, recipient) => {
  const tokenInfo = BASE_TOKEN_INFO[token];
  if (!tokenInfo) throw new Error('Invalid token');

  if (token === 'ETH') {
    const tx = await walletClient.sendTransaction({
      to: recipient,
      value: parseEther(amount)
    });
    return tx;
  } else {
    const tx = await walletClient.writeContract({
      address: tokenInfo.address,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [recipient, parseUnits(amount, tokenInfo.decimals)]
    });
    return tx;
  }
};

// API Proxy Endpoints

// LayerSwap
app.post('/api/layerswap/swaps', async (req, res) => {
  try {
    const response = await axios.post(
      `${LAYERSWAP_BASE_URL}/swaps`,
      req.body,
      { headers: { 'X-LS-APIKEY': process.env.LAYERSWAP_API_KEY, 'Content-Type': 'application/json' } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to create swap');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

app.get('/api/layerswap/swaps/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${LAYERSWAP_BASE_URL}/swaps/${req.params.id}`,
      { headers: { 'X-LS-APIKEY': process.env.LAYERSWAP_API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to get swap details');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

// Paycrest
app.get('/api/paycrest/currencies', async (req, res) => {
  try {
    const response = await axios.get(
      `${PAYCREST_BASE_URL}/currencies`,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to fetch currencies');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

app.get('/api/paycrest/institutions/:currency', async (req, res) => {
  try {
    const response = await axios.get(
      `${PAYCREST_BASE_URL}/institutions/${req.params.currency}`,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to fetch institutions');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

app.post('/api/paycrest/verify-account', async (req, res) => {
  try {
    const response = await axios.post(
      `${PAYCREST_BASE_URL}/verify-account`,
      req.body,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY, 'Content-Type': 'application/json' } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to verify account');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

app.get('/api/paycrest/rates/:token/:amount/:currency', async (req, res) => {
  const { token, amount, currency } = req.params;
  const network = req.query.network || 'base';
  try {
    const response = await axios.get(
      `${PAYCREST_BASE_URL}/rates/${token}/${amount}/${currency}?network=${network}`,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to fetch rate');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

app.post('/api/paycrest/sender/orders', async (req, res) => {
  try {
    const response = await axios.post(
      `${PAYCREST_BASE_URL}/sender/orders`,
      req.body,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY, 'Content-Type': 'application/json' } }
    );
    res.json(response.data);
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to create order');
    res.status(error.response?.status || 500).json({ error: errMsg });
  }
});

// Base operations
app.get('/api/base/balance/:token', async (req, res) => {
  try {
    const balance = await getBaseBalance(req.params.token);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to complete the trade on Base
app.post('/api/complete-base-trade', async (req, res) => {
  const { swapId, token, currency, bankCode, accountIdentifier, accountName } = req.body;
  try {
    // Get swap details
    const swapResponse = await axios.get(
      `${LAYERSWAP_BASE_URL}/swaps/${swapId}`,
      { headers: { 'X-LS-APIKEY': process.env.LAYERSWAP_API_KEY } }
    );
    const minReceiveAmount = swapResponse.data.data.quote.min_receive_amount;

    // Poll for funds arrival (max 5 minutes, check every 10 seconds)
    let currentBalance = await getBaseBalance(token);
    const expected = parseFloat(minReceiveAmount);
    let attempts = 0;
    while (parseFloat(currentBalance) < expected && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      currentBalance = await getBaseBalance(token);
      attempts++;
    }
    if (parseFloat(currentBalance) < expected) throw new Error('Funds not received in time');

    // Get rate
    const rateResponse = await axios.get(
      `${PAYCREST_BASE_URL}/rates/${token}/${minReceiveAmount}/${currency}?network=base`,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY } }
    );
    const rate = rateResponse.data.data;

    // Create order
    const orderData = {
      amount: minReceiveAmount,
      token,
      rate,
      network: 'base',
      recipient: {
        institution: bankCode,
        accountIdentifier,
        accountName,
        currency
      },
      returnAddress: BASE_ADDRESS
    };
    const orderResponse = await axios.post(
      `${PAYCREST_BASE_URL}/sender/orders`,
      orderData,
      { headers: { 'API-Key': process.env.PAYCREST_API_KEY, 'Content-Type': 'application/json' } }
    );
    const receiveAddress = orderResponse.data.data.receiveAddress; // Assume this field exists based on task

    // Send on Base
    const tx = await sendOnBase(token, minReceiveAmount, receiveAddress);

    res.json({ success: true, txHash: tx });
  } catch (error) {
    const errMsg = handleApiError(error, 'Failed to complete trade');
    res.status(500).json({ error: errMsg });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});