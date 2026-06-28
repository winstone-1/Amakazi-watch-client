import api from './axios';

// Intelligence endpoints (require X-API-Key header)
export const getCountyRisk = async (apiKey) => {
  const response = await api.get('intelligence/county-risk/', {
    headers: { 'X-API-Key': apiKey }
  });
  return response.data;
};

export const getAbuseDistribution = async (county, apiKey) => {
  const response = await api.get('intelligence/abuse-distribution/', {
    params: { county },
    headers: { 'X-API-Key': apiKey }
  });
  return response.data;
};

export const getTrendForecast = async (days, apiKey) => {
  const response = await api.get('intelligence/trend-forecast/', {
    params: { days },
    headers: { 'X-API-Key': apiKey }
  });
  return response.data;
};
