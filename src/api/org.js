import api from './axios';

// Org coordination
export const getOrgInventory = async () => {
  const response = await api.get('org/inventory/');
  return response.data;
};

export const updateOrgInventory = async (items) => {
  const response = await api.post('org/inventory/', { items });
  return response.data;
};

export const getCaseMatches = async () => {
  const response = await api.get('org/case-matching/');
  return response.data;
};

export const getOrgMessages = async () => {
  const response = await api.get('org/messages/');
  return response.data;
};

export const sendOrgMessage = async (payload) => {
  const response = await api.post('org/messages/', payload);
  return response.data;
};

export const getVolunteers = async () => {
  const response = await api.get('org/volunteers/');
  return response.data;
};

export const getOrgHotspots = async () => {
  const response = await api.get('org/hotspots/');
  return response.data;
};

// General Organisations
export const getOrganisations = async () => {
  const response = await api.get('organisations/');
  return response.data;
};

export const registerOrganisation = async (payload) => {
  const response = await api.post('organisations/', payload);
  return response.data;
};

export const getOrganisationsMap = async () => {
  const response = await api.get('organisations/map/');
  return response.data;
};

export const toggleBookmarkOrganisation = async (id) => {
  const response = await api.post(`organisations/${id}/bookmark/`);
  return response.data;
};

export const addOrganisationReview = async (id, review) => {
  const response = await api.post(`organisations/${id}/reviews/`, review);
  return response.data;
};

export const getOrganisationReviews = async (id) => {
  const response = await api.get(`organisations/${id}/reviews/`);
  return response.data;
};

export const getOrganisationsByCounty = async (county) => {
  const response = await api.get('organisations/', { params: { county } });
  return response.data;
};

export const registerVolunteer = async (data) => {
  const response = await api.post('org/volunteers/', data);
  return response.data;
};

export const matchCase = async (data) => {
  const response = await api.post('org/case-matching/', data);
  return response.data;
};

export const getResourcesByCounty = async (county) => {
  const response = await api.get('org/inventory/county/', { params: { county } });
  return response.data;
};
