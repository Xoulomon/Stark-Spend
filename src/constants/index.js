// ==================== CONSTANTS ====================
export const CONSTANTS = {
  // API Endpoints (local proxy)
  API_BASE_URL: '',

  // Contract Addresses (Starknet)
  STABLECOIN_CONTRACTS: {
    USDC: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
    USDT: '0x068f5c6a61780768455de69077e917e519ada645a524dd210e42a555b3a4e6d4',
    DAI: '0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad',
    ETH: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
  },

  // Base Network Configuration
  BASE_ADDRESS: '0xb39b7c02372dBBb003c05D6b4ABA2eC68842934D',

  // Supported Networks
  SOURCE_NETWORK: 'STARKNET_MAINNET',
  DESTINATION_NETWORK: 'BASE_MAINNET',

  // Default network
  DEFAULT_NETWORK: 'SN_MAIN',

  // Starknet Networks
  NETWORKS: {
    mainnet: {
      id: 'SN_MAIN',
      name: 'Mainnet',
    },
    sepolia: {
      id: 'SN_SEPOLIA',
      name: 'Sepolia',
    }
  }
};