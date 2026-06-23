import React from 'react';
import Layout from '../components/common/Layout';
import SafetyTimer from '../components/safety/SafetyTimer';
import SafeWord from '../components/safety/SafeWord';
import RiskAssessment from '../components/safety/RiskAssessment';
import EscapePlan from '../components/safety/EscapePlan';

export const Safety = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Safety Hub</h1>
          <p className="text-brand-muted text-sm mt-1">Your secure space for protection, planning, and immediate assistance. All tools are designed for trauma-informed care and discretion.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Timer + Safe Word */}
          <div className="lg:col-span-5 space-y-6">
            <SafetyTimer />
            <SafeWord />
          </div>

          {/* Right: Assessment + Escape Plan */}
          <div className="lg:col-span-7 space-y-6">
            <RiskAssessment />
            <EscapePlan />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Safety;
