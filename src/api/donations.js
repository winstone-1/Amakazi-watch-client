import api from './axios';

export const initiateMpesaDonation = async (phone, amount, organisationId = null) => {
  const response = await api.post('/payments/mpesa/stkpush/', { 
    phone, 
    amount,
    organisation_id: organisationId,
  });
  return response.data;
};

export const initiatePaystackDonation = async (amount, organisationId = null) => {
  const response = await api.post('/payments/paystack/initialize/', { 
    amount,
    organisation_id: organisationId,
  });
  return response.data;
};

export const initiateManualPayment = async (amount, organisationId = null) => {
  const response = await api.post('/payments/manual/initiate/', {
    amount,
    organisation_id: organisationId,
  });
  return response.data;
};

export const checkPaymentStatus = async (reference) => {
  const response = await api.get(`/payments/status/${reference}/`);
  return response.data;
};