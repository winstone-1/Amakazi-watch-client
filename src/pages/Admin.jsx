import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import Users from '../components/admin/Users';
import Organisations from '../components/admin/Organisations';
import Reports from '../components/admin/Reports';

export const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">System Administration Console</h1>
          <p className="text-brand-muted text-sm mt-1">Manage global user credentials, verify registered NGO partners, and moderate filed safety reports.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-brand-peach/25 pb-1">
          {[
            { id: 'users', label: 'User Directory' },
            { id: 'orgs', label: 'NGO Partners' },
            { id: 'reports', label: 'Safety Reports' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-5 font-bold text-sm border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-muted hover:text-brand-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Component Load */}
        <div className="mt-4">
          {activeTab === 'users' && <Users />}
          {activeTab === 'orgs' && <Organisations />}
          {activeTab === 'reports' && <Reports />}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
