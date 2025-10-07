import { useState } from 'react';
import axios from 'axios';
import { CONSTANTS } from '../constants';
import { utils } from '../utils';

// LayerSwap API Hook
export const useLayerSwap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSwap = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${CONSTANTS.API_BASE_URL}/api/layerswap/swaps`,
        {
          source_network: CONSTANTS.SOURCE_NETWORK,
          source_token: params.source_token,
          destination_token: params.destination_token,
          destination_network: CONSTANTS.DESTINATION_NETWORK,
          refuel: true,
          amount: params.amount,
          destination_address: CONSTANTS.BASE_ADDRESS,
          network: params.network || CONSTANTS.DEFAULT_NETWORK
        }
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to create swap'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSwapDetails = async (swapId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}/api/layerswap/swaps/${swapId}`
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to get swap details'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSwap, getSwapDetails, loading, error };
};