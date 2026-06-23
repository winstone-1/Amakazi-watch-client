import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import DocumentList from '../components/vault/DocumentList';
import DocumentUpload from '../components/vault/DocumentUpload';

export const Vault = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Digital Document Vault</h1>
          <p className="text-brand-muted text-sm mt-1">Store your critical identity papers, legal protection forms, and clinical evidence securely in our local encrypted stashing system.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <DocumentList key={refreshKey} />
          </div>
          <div className="lg:col-span-4">
            <DocumentUpload onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vault;
