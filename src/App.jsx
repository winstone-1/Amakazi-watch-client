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
