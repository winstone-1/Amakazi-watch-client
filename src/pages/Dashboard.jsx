import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import SurvivorDashboard from '../components/dashboard/SurvivorDashboard';
import OrgDashboard from '../components/dashboard/OrgDashboard';
import CountyDashboard from '../components/dashboard/CountyDashboard';

export const Dashboard = () => {
  const { role } = useAuth();

  const renderDashboard = () => {
    switch (role) {
      case 'Survivor':
        return <SurvivorDashboard />;
      case 'Counselor':
        // Counselor shares the Peer Support views + Workshops view, let's show Survivor-like dashboard but tailored to counselor functions
        return <OrgDashboard />; // Counselor can coordinate resources
      case 'Org Staff':
        return <OrgDashboard />;
      case 'County Official':
        return <CountyDashboard />;
      case 'Admin':
        return <SurvivorDashboard />; // Admin gets full access (including admin panel in nav)
      default:
        return <SurvivorDashboard />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard;
