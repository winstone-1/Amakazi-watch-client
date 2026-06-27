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
import Login from './pages/Login';
import Register from './pages/Register';
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
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
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
