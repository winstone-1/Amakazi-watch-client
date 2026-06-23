import api from './axios';

// Educational Content
export const getContents = async (params) => {
  const response = await api.get('content/', { params });
  return response.data;
};

export const createContent = async (payload) => {
  const response = await api.post('content/', payload);
  return response.data;
};

export const rateContent = async (id, rating) => {
  const response = await api.post(`content/${id}/rate/`, { rating });
  return response.data;
};

// Campaigns
export const getCampaigns = async () => {
  const response = await api.get('campaigns/');
  return response.data;
};

export const createCampaign = async (payload) => {
  const response = await api.post('campaigns/', payload);
  return response.data;
};

export const deleteCampaign = async (id) => {
  const response = await api.delete(`campaigns/${id}/`);
  return response.data;
};

// Workshops
export const getWorkshops = async () => {
  const response = await api.get('workshops/');
  return response.data;
};

export const registerWorkshop = async (id) => {
  const response = await api.post(`workshops/${id}/register/`);
  return response.data;
};

export const submitWorkshopFeedback = async (id, feedback) => {
  const response = await api.post(`workshops/${id}/feedback/`, { feedback });
  return response.data;
};

// Tips
export const submitSafetyTip = async (payload) => {
  const response = await api.post('tips/', payload);
  return response.data;
};

// Scorecards
export const getCountyRankings = async () => {
  const response = await api.get('scorecard/rankings/');
  return response.data;
};

export const getCountyScorecard = async (county) => {
  const response = await api.get(`scorecard/${county}/`);
  return response.data;
};

// General AI Chatbot
export const postGeneralChat = async (message) => {
  const response = await api.post('chat/', { message });
  return response.data;
};

// Set Preferred Language on Backend
export const setBackendLanguage = async (language) => {
  const response = await api.post('language/', { language });
  return response.data;
};
