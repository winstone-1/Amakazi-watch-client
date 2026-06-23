import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import ReportWizard from '../components/reports/ReportWizard';
import ReportList from '../components/reports/ReportList';
import ReportDetail from '../components/reports/ReportDetail';

export const Reports = () => {
  const [activeReportId, setActiveReportId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleWizardSuccess = () => {
    // Increment refresh key to trigger list refetch
    setRefreshKey(prev => prev + 1);
  };

  const handleViewDetail = (id) => {
    setActiveReportId(id);
  };

  const handleBackToList = () => {
    setActiveReportId(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Incident Reports</h1>
          <p className="text-brand-muted text-sm mt-1">File, track, and manage your security incident folders in a secure, confidential workspace.</p>
        </div>

        {activeReportId ? (
          <ReportDetail reportId={activeReportId} onBack={handleBackToList} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <ReportWizard onSuccess={handleWizardSuccess} />
            </div>
            <div className="lg:col-span-5">
              <ReportList key={refreshKey} onViewDetail={handleViewDetail} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
