import React from 'react';
import Layout from '../components/common/Layout';
import LegalBotComponent from '../components/legal/LegalBot';

export const LegalBot = () => {
  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Legal Assistant</h1>
          <p className="text-brand-muted text-sm mt-1">Get immediate advice on Kenyan domestic violence laws and protection order applications.</p>
        </div>

        <LegalBotComponent />
      </div>
    </Layout>
  );
};

export default LegalBot;
