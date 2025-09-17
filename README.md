# StarkSpend

A modular, responsive React web application for off-ramping stablecoins (USDT, USDC, ETH, DAI) from the Starknet ecosystem to fiat currencies.

## Features

- **Wallet Integration**: Connect Starknet wallets (Argent X, Braavos) using Starknet.js
- **Multi-Asset Support**: Support for USDC, USDT, DAI, and ETH
- **Fiat Currency Support**: Multiple African currencies (NGN, KES, TZS, UGX, GHS)
- **Bank Integration**: Automatic bank institution fetching and account verification
- **Real-time Rates**: Live exchange rates and payout calculations

## Architecture

### Modular Structure
- **Components**: Reusable React components for each UI element
- **Hooks**: Custom hooks for API calls and wallet interactions
- **Utilities**: Helper functions for data conversion and error handling
- **Constants**: Centralized configuration and environment variables

### API Integration
- **LayerSwap API**: Bridges assets from Starknet to Base network
- **Paycrest API**: Handles fiat off-ramping and bank transfers
- **Starknet.js**: Wallet connection and blockchain interactions
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

### 3. Running the Application
Simply open `index.html` in a modern web browser. The application uses CDN links for all dependencies.

## Usage Flow

1. **Connect Wallet**: Click "Connect Starknet Wallet" and approve the connection
2. **Select Stablecoin**: Choose from USDC, USDT, DAI, or ETH
3. **Choose Fiat Currency**: Select your target currency (NGN, KES, etc.)
4. **Select Bank**: Choose your bank institution from the dropdown
5. **Enter Account Details**: Input your account number (auto-verification at 10+ characters)
6. **Enter Trade Amount**: Specify amount in crypto or fiat
7. **Review Payout**: Check the estimated fiat payout amount
8. **Initiate Trade**: Click "Initiate Trade" to execute the transaction

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Private Keys**: Store private keys securely and never expose them in frontend code
- **HTTPS**: Use HTTPS in production to secure API communications
- **Rate Limiting**: Implement rate limiting for API calls
- **Input Validation**: Validate all user inputs before processing

## API Endpoints Used

### LayerSwap API
- `POST /api/v2/swaps` - Create bridge transaction
- `GET /api/v2/swaps/{id}` - Get swap details and call_data

### Paycrest API
- `GET /v1/currencies` - Get supported fiat currencies
- `GET /v1/institutions/{currency}` - Get bank institutions
- `POST /v1/verify-account` - Verify bank account details
- `GET /v1/rates/{token}/{amount}/{currency}` - Get exchange rates
- `POST /v1/sender/orders` - Create payment order

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