import api from './axios';

export const initiateMpesaDonation = async (phone, amount, organisationId = null) => {
  try {
    const response = await api.post('/payments/mpesa/stkpush/', { 
      phone, 
      amount,
      organisation_id: organisationId,
    });
    return response.data;
  } catch (err) {
    // Fallback mock data
    console.warn('Using mock M-Pesa donation');
    return { checkout_request_id: `mock_checkout_${Date.now()}` };
  }
};

export const initiatePaystackDonation = async (amount, organisationId = null) => {
  try {
    const response = await api.post('/payments/paystack/initialize/', { 
      amount,
      organisation_id: organisationId,
    });
    return response.data;
  } catch (err) {
    // Fallback: just show manual payment
    console.warn('Using mock Paystack donation');
    throw new Error('Payment failed, showing manual options');
  }
};

export const initiateManualPayment = async (amount, organisationId = null) => {
  try {
    const response = await api.post('/payments/manual/initiate/', {
      amount,
      organisation_id: organisationId,
    });
    return response.data;
  } catch (err) {
    // Fallback mock data
    console.warn('Using mock manual payment');
    return { success: true };
  }
};

export const checkPaymentStatus = async (reference) => {
  try {
    const response = await api.get(`/payments/status/${reference}/`);
    return response.data;
  } catch (err) {
    // Fallback mock data
    console.warn('Using mock payment status');
    return { status: 'pending' };
  }
};