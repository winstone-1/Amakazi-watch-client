import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { GoogleAuthProvider } from './context/GoogleAuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import EmergencyButton from './components/common/EmergencyButton';
import Chatbot from './components/chat/Chatbot';

// Pages
import Landing from './pages/Landing';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import GetHelp from './pages/GetHelp';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Safety from './pages/Safety';
import Vault from './pages/Vault';
import PeerSupport from './pages/PeerSupport';
import LegalBot from './pages/LegalBot';
import Organisations from './pages/Organisations';
import Education from './pages/Education';
import Scorecards from './pages/Scorecards';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Stories from './pages/Stories';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import SupportGroups from './pages/SupportGroups';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import News from './pages/News';
import ReportStatus from './pages/ReportStatus';

// Feature Pages
import SafetyTimer from './pages/features/SafetyTimer';
import SafeWord from './pages/features/SafeWord';
import RiskAssessment from './pages/features/RiskAssessment';
import EscapePlan from './pages/features/EscapePlan';
import DocumentVault from './pages/features/DocumentVault';
import PeerChat from './pages/features/PeerChat';
import LegalQA from './pages/features/LegalQA';
import ResourceInventory from './pages/features/ResourceInventory';
import CaseMatching from './pages/features/CaseMatching';
import Campaigns from './pages/features/Campaigns';
import Workshops from './pages/features/Workshops';
import Tips from './pages/features/Tips';
import CountyScorecard from './pages/features/CountyScorecard';
import Analytics from './pages/features/Analytics';
import Notifications from './pages/features/Notifications';
import PanicButton from './pages/features/PanicButton';
import Referrals from './pages/features/Referrals';
import BulkSMS from './pages/features/BulkSMS';
import Terms from './pages/features/Terms';
import Privacy from './pages/features/Privacy';
import Heatmap from './pages/features/Heatmap';
import Subscriptions from './pages/features/Subscriptions';

import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/get-help" element={<GetHelp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/peer-support" element={<PeerSupport />} />
            <Route path="/legal-bot" element={<LegalBot />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route path="/education" element={<Education />} />
            <Route path="/scorecards" element={<Scorecards />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/support-groups" element={<SupportGroups />} />
            <Route path="/report-status" element={<ReportStatus />} />

            <Route path="/safety/timer" element={<SafetyTimer />} />
            <Route path="/safety/safe-word" element={<SafeWord />} />
            <Route path="/safety/risk-assessment" element={<RiskAssessment />} />
            <Route path="/safety/escape-plan" element={<EscapePlan />} />
            <Route path="/vault/documents" element={<DocumentVault />} />
            <Route path="/peer/chat" element={<PeerChat />} />
            <Route path="/legal/ask" element={<LegalQA />} />
            <Route path="/org/inventory" element={<ResourceInventory />} />
            <Route path="/org/case-matching" element={<CaseMatching />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/scorecard" element={<CountyScorecard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/panic" element={<PanicButton />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/bulk-sms" element={<BulkSMS />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

const GOOGLE_CLIENT_ID = '282565566079-kd9eh75lvoe4hleqnl3mgthv8p2qi3ht.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <GoogleAuthProvider>
                  <EmergencyButton />
                  <Chatbot />
                  <AnimatedRoutes />
                </GoogleAuthProvider>
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
