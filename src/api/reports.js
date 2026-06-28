import api from './axios';

export const createReport = async (reportData) => {
  // Can be multipart/form-data if evidence files are attached
  const isMultipart = reportData instanceof FormData;
  const response = await api.post('reports/', reportData, {
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
  });
  return response.data;
};

export const getReports = async (params) => {
  const response = await api.get('reports/', { params });
  return response.data;
};

export const getReportStats = async () => {
  const response = await api.get('reports/stats/');
  return response.data;
};

// Alias
export const getReportsStats = getReportStats;

export const getReportHeatmap = async () => {
  const response = await api.get('reports/heatmap/');
  return response.data;
};
