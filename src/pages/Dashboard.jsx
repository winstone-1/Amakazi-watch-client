import React from "react";
import { useAuth } from '../context/AuthContext';
import SurvivorDashboard from '../components/dashboard/SurvivorDashboard';
import CounselorDashboard from '../components/dashboard/CounselorDashboard';
import OrgStaffDashboard from '../components/dashboard/OrgStaffDashboard';
import CountyOfficialDashboard from '../components/dashboard/CountyOfficialDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // AuthContext.normaliseUser already lowercases/trims the role on login/load
  const role = user?.role || 'survivor';

  console.log('[Dashboard] user:', user, '| role:', role);

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'counselor':
      return <CounselorDashboard />;
    case 'org_staff':
      return <OrgStaffDashboard />;
    case 'county_official':
      return <CountyOfficialDashboard />;
    default:
      return <SurvivorDashboard />;
  }
}

export default Dashboard;
