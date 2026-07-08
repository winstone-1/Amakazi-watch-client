import api from './index';

export const initiateMpesaDonation = async (phone, amount) => {
  const response = await api.post('/payments/mpesa/stkpush/', { phone, amount });
  return response.data;
};

export const initiatePaystackDonation = async (amount) => {
  const response = await api.post('/payments/paystack/initialize/', { amount });
  return response.data;
};
