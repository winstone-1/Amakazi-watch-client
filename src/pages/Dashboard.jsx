import { useAuth } from '../context/AuthContext';
import SurvivorDashboard from '../components/dashboard/SurvivorDashboard';
import CounselorDashboard from '../components/dashboard/CounselorDashboard';
import OrgStaffDashboard from '../components/dashboard/OrgStaffDashboard';
import CountyOfficialDashboard from '../components/dashboard/CountyOfficialDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role || 'survivor';

  const renderDashboard = () => {
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
  };

  return <div className="transition-colors duration-300">{renderDashboard()}</div>;
}

export default Dashboard;
