# StarkSpend

A modular, responsive React web application for off-ramping stablecoins (USDT, USDC, ETH, DAI) from the Starknet ecosystem to fiat currencies using LayerSwap and Paycrest APIs.

## Features

- **Wallet Integration**: Connect Starknet wallets (Argent X, Braavos, Argent Mobile) using @starknet-react/core
- **Network Support**: Support for both Starknet Mainnet and Sepolia testnet
- **Multi-Asset Support**: Support for USDC, USDT, DAI, and ETH
- **Fiat Currency Support**: Multiple African currencies (NGN, KES, TZS, UGX, GHS)
- **Bank Integration**: Automatic bank institution fetching and account verification
- **Real-time Rates**: Live exchange rates and payout calculations using Paycrest
- **Balance Display**: Real-time token balance display for connected wallets
- **Modular Architecture**: Clean separation of components, hooks, and utilities

## Architecture

### Modular Structure
- **Components**: Reusable React components for each UI element
- **Hooks**: Custom hooks for API calls and wallet interactions
- **Utilities**: Helper functions for data conversion and error handling
- **Constants**: Centralized configuration and environment variables

### API Integration
- **LayerSwap API**: Bridges assets from Starknet to Base network
- **Paycrest API**: Handles fiat off-ramping and bank transfers
- **@starknet-react/core**: Wallet connection and blockchain interactions
- **Viem**: Base network transaction signing

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with your API keys:

```env
LAYERSWAP_API_KEY=your_layerswap_api_key_here
PAYCREST_API_KEY=your_paycrest_api_key_here
BASE_PRIVATE_KEY=your_base_private_key_here
```

### 2. API Keys
- **LayerSwap API Key**: Get from [LayerSwap Dashboard](https://layerswap.io)
- **Paycrest API Key**: Get from [Paycrest Dashboard](https://paycrest.io)
- **Base Private Key**: Your Base network wallet private key (store securely)

### 3. Installation
```bash
npm install
```

### 4. Running the Application
```bash
# Start the backend API server
npm start

# In another terminal, start the frontend development server
npm run dev
```

The application will be available at `http://localhost:5173` with the API server running on port 3000.

## Usage Flow

1. **Select Network**: Choose between Starknet Mainnet or Sepolia testnet
2. **Connect Wallet**: Click "Connect" on your preferred Starknet wallet (Argent X, Braavos, Argent Mobile, etc.)
3. **Select Stablecoin**: Choose from USDC, USDT, DAI, or ETH (balance will be displayed)
4. **Choose Fiat Currency**: Select your target currency (NGN, KES, etc.)
5. **Select Bank**: Choose your bank institution from the dropdown
6. **Enter Account Details**: Input your account number (auto-verification at 10+ characters)
7. **Enter Trade Amount**: Specify amount in crypto or fiat using the toggle
8. **Review Payout**: Check the estimated fiat payout amount calculated via Paycrest
9. **Initiate Trade**: Click "Initiate Trade" to execute the transaction (Starknet → Base → Fiat)

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Private Keys**: Store private keys securely and never expose them in frontend code
- **HTTPS**: Use HTTPS in production to secure API communications
- **Rate Limiting**: Implement rate limiting for API calls
- **Input Validation**: Validate all user inputs before processing

## API Endpoints

### Backend API Endpoints
- `GET /api/tokens` - Get supported stablecoins
- `GET /api/networks` - Get supported Starknet networks
- `GET /api/rates/:currency` - Get exchange rates for all tokens

### LayerSwap API
- `POST /api/layerswap/swaps` - Create bridge transaction
- `GET /api/layerswap/swaps/{id}` - Get swap details and call_data

### Paycrest API
- `GET /api/paycrest/currencies` - Get supported fiat currencies
- `GET /api/paycrest/institutions/{currency}` - Get bank institutions
- `POST /api/paycrest/verify-account` - Verify bank account details
- `GET /api/paycrest/rates/{token}/{amount}/{currency}` - Get exchange rates
- `POST /api/paycrest/sender/orders` - Create payment order

### Base Operations
- `GET /api/base/balance/{token}` - Get Base network token balance
- `POST /api/complete-base-trade` - Complete the fiat off-ramp transaction

## Error Handling

The application includes comprehensive error handling for:
- Network connectivity issues
- API authentication failures
- Rate limiting (429 errors)
- Invalid input validation
- Transaction failures

## Responsive Design

The application is optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Features include:
- Flexible grid layouts
- Touch-friendly interfaces
- Adaptive typography
- Smooth animations and transitions

## Testing

To test the application:
1. Use testnet tokens on Starknet
2. Verify with test bank accounts
3. Check API rate limits
4. Test error scenarios
5. Validate responsive design

## Future Enhancements

- Multi-language support
- Additional stablecoins and networks
- Advanced order tracking
- Mobile app version
- DeFi integration
- Advanced analytics

## Support

For issues related to:
- **LayerSwap API**: Contact LayerSwap support
- **Paycrest API**: Contact Paycrest support
- **Starknet.js**: Check Starknet documentation
- **Application bugs**: Create an issue in this repository

## License

This project is open source and available under the MIT License.