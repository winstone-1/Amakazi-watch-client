import api from './axios';

const MOCK_REPORTS = {
  results: [
    { id: 101, incident_type: 'physical', county: 'Nairobi', status: 'pending', created_at: new Date().toISOString(), anonymous: false },
    { id: 102, incident_type: 'sexual', county: 'Kisumu', status: 'in_review', created_at: new Date(Date.now() - 86400000).toISOString(), anonymous: true },
    { id: 103, incident_type: 'economic', county: 'Mombasa', status: 'resolved', created_at: new Date(Date.now() - 172800000).toISOString(), anonymous: false },
  ],
};

const MOCK_STATS = { total: 3, pending: 1, in_review: 1, resolved: 1 };

export const createReport = async (reportData) => {
  try {
    // Can be multipart/form-data if evidence files are attached
    const isMultipart = reportData instanceof FormData;
    const response = await api.post('reports/', reportData, {
      headers: {
        'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    // Fallback mock data
    return { id: Date.now(), status: 'pending', created_at: new Date().toISOString(), ...reportData };
  }
};

export const getReports = async (params) => {
  try {
    const response = await api.get('reports/', { params });
    return response.data;
  } catch (err) {
    return MOCK_REPORTS;
  }
};

export const getReportStats = async () => {
  try {
    const response = await api.get('reports/stats/');
    return response.data;
  } catch (err) {
    return MOCK_STATS;
  }
};

// Alias
export const getReportsStats = getReportStats;

export const getReportHeatmap = async () => {
  try {
    const response = await api.get('reports/heatmap/');
    return response.data;
  } catch (err) {
    // Fallback to mock heatmap data
    return [
      { lat: -1.2921, lng: 36.8219, county: 'Nairobi', incidents: 187, level: 'high' },
      { lat: -4.0435, lng: 39.6682, county: 'Mombasa', incidents: 94, level: 'medium' },
      { lat: -0.1022, lng: 34.7617, county: 'Kisumu', incidents: 76, level: 'medium' },
    ];
  }
};
