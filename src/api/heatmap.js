import api from './axios';

const defaultHeatmapData = [
  { county: 'Nairobi', lat: -1.2921, lng: 36.8219, count: 18, abuse_type: 'Physical' },
  { county: 'Mombasa', lat: -4.0435, lng: 39.6682, count: 12, abuse_type: 'Psychological' },
  { county: 'Kisumu', lat: -0.1022, lng: 34.7617, count: 15, abuse_type: 'Sexual' },
  { county: 'Nakuru', lat: -0.3031, lng: 36.0800, count: 10, abuse_type: 'Emotional' },
  { county: 'Eldoret', lat: 0.5143, lng: 35.2698, count: 9, abuse_type: 'Economic' },
  { county: 'Machakos', lat: -1.5177, lng: 37.2634, count: 7, abuse_type: 'Physical' },
];

const defaultNgoData = [
  { id: 1, name: 'FIDA Kenya', lat: -1.2921, lng: 36.8219, services: ['legal aid', 'counseling'], verified: true, county: 'Nairobi', contact: '+254 700 000 001' },
  { id: 2, name: 'Women’s Rights Initiative', lat: -0.1022, lng: 34.7617, services: ['counseling', 'medical'], verified: true, county: 'Kisumu', contact: '+254 700 000 002' },
  { id: 3, name: 'Safe Haven Shelter', lat: -4.0435, lng: 39.6682, services: ['shelter', 'counseling'], verified: true, county: 'Mombasa', contact: '+254 700 000 003' },
  { id: 4, name: 'Rural Support Network', lat: 0.5143, lng: 35.2698, services: ['legal aid', 'medical'], verified: true, county: 'Uasin Gishu', contact: '+254 700 000 004' },
];

const defaultScoreData = [
  { county: 'Nairobi', score: 82, rank: 1, reports_count: 54 },
  { county: 'Kisumu', score: 76, rank: 2, reports_count: 43 },
  { county: 'Mombasa', score: 71, rank: 3, reports_count: 37 },
  { county: 'Nakuru', score: 67, rank: 4, reports_count: 29 },
  { county: 'Uasin Gishu', score: 63, rank: 5, reports_count: 24 },
];

export const fetchHeatmapData = async () => {
  try {
    const response = await api.get('/reports/heatmap/');
    return response.data;
  } catch (error) {
    console.warn('Heatmap endpoint unavailable, using fallback sample data', error);
    return defaultHeatmapData;
  }
};

export const fetchNgoData = async () => {
  try {
    const response = await api.get('/organisations/heatmap/');
    return response.data.filter((org) => org.verified !== false);
  } catch (error) {
    console.warn('Organisation heatmap endpoint unavailable, using fallback sample data', error);
    return defaultNgoData;
  }
};

export const fetchScoreData = async () => {
  try {
    const response = await api.get('/scorecard/');
    return response.data;
  } catch (error) {
    console.warn('Scorecard endpoint unavailable, using fallback sample data', error);
    return defaultScoreData;
  }
};
