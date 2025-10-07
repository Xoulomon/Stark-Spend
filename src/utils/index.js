// ==================== UTILITY FUNCTIONS ====================
export const utils = {
  // API Error Handling
  handleApiError: (error, customMessage) => {
    console.error(customMessage || 'API Error:', error);
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        return 'Invalid request. Please check your input.';
      } else if (status === 401) {
        return 'Authentication failed. Please check your API key.';
      } else if (status === 429) {
        return 'Rate limit exceeded. Please try again later.';
      } else if (status >= 500) {
        return 'Server error. Please try again later.';
      }
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    }
    return 'An unexpected error occurred.';
  },

  // Retry logic for API calls
  retryApiCall: async (apiCall, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  },

  // Convert decimal to hexadecimal
  decimalToHex: (decimal, padding = 0) => {
    const hex = decimal.toString(16);
    return '0x' + hex.padStart(padding, '0');
  },

  // Format wallet address
  formatAddress: (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  },

  // Format currency amount
  formatAmount: (amount, decimals = 6) => {
    return parseFloat(amount).toFixed(decimals);
  },

  // Convert to base units
  toBaseUnits: (amount, decimals) => {
    return Math.floor(parseFloat(amount) * Math.pow(10, decimals)).toString();
  },

  // Convert from base units
  fromBaseUnits: (amount, decimals) => {
    try {
      console.log('Converting amount:', amount, 'with decimals:', decimals);
      if (!amount) return '0';

      // Use BigInt for precise calculations
      const bigAmount = BigInt(amount);
      const divisor = BigInt(10 ** decimals);

      // Perform division
      const wholePart = (bigAmount / divisor).toString();
      const fractionalPart = (bigAmount % divisor).toString().padStart(decimals, '0');

      // Combine whole and fractional parts
      const result = `${wholePart}.${fractionalPart}`;
      console.log('Converted result:', result);

      // Remove trailing zeros and decimal point if necessary
      return result.replace(/\.?0+$/, '');
    } catch (err) {
      console.error('Error in fromBaseUnits:', err);
      return '0';
    }
  }
};