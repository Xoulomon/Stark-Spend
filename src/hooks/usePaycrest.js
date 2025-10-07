import { useState } from 'react';
import axios from 'axios';
import { CONSTANTS } from '../constants';
import { utils } from '../utils';

// Paycrest API Hook
export const usePaycrest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrencies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}/api/paycrest/currencies`
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to fetch currencies'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getInstitutions = async (currency) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}/api/paycrest/institutions/${currency}`
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to fetch institutions'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyAccount = async (institution, accountIdentifier) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${CONSTANTS.API_BASE_URL}/api/paycrest/verify-account`,
        {
          institution,
          accountIdentifier
        }
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to verify account'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getRate = async (token, amount, currency, network = 'base') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${CONSTANTS.API_BASE_URL}/api/paycrest/rates/${token}/${amount}/${currency}?network=${network}`
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to fetch rate'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${CONSTANTS.API_BASE_URL}/api/paycrest/sender/orders`,
        orderData
      );
      return response.data.data;
    } catch (err) {
      setError(utils.handleApiError(err, 'Failed to create order'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getCurrencies, getInstitutions, verifyAccount, getRate, createOrder, loading, error };
};