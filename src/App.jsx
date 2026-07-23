import React from "react";
import { Routes, Route } from 'react-router-dom';  // Remove BrowserRouter import
import { GoogleAuthProvider } from './context/GoogleAuthContext';
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
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Organisations from './pages/Organisations';
import Heatmap from './pages/Heatmap';
import Settings from './pages/Settings';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import LegalBot from './pages/LegalBot';
import Safety from './pages/Safety';
import Vault from './pages/Vault';
import PeerSupport from './pages/PeerSupport';
import SupportGroups from './pages/SupportGroups';
import Education from './pages/Education';
import Stories from './pages/Stories';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import News from './pages/News';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Subscriptions from './pages/Subscriptions';
import Scorecards from './pages/Scorecards';
import Admin from './pages/Admin';
import ReportStatus from './pages/ReportStatus';

// Feature pages
import SafetyTimer from './pages/features/SafetyTimer';
import SafeWord from './pages/features/SafeWord';
import RiskAssessment from './pages/features/RiskAssessment';
import EscapePlan from './pages/features/EscapePlan';
import DocumentVault from './pages/features/DocumentVault';

function App() {
  return (
    <GoogleAuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/get-help" element={<GetHelp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/news" element={<News />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/report-status" element={<ReportStatus />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected routes with Layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/organisations" element={
          <ProtectedRoute>
            <Layout>
              <Organisations />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/heatmap" element={
          <ProtectedRoute>
            <Layout>
              <Heatmap />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/legal-bot" element={
          <ProtectedRoute>
            <Layout>
              <LegalBot />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/safety" element={
          <ProtectedRoute>
            <Layout>
              <Safety />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/safety/timer" element={
          <ProtectedRoute>
            <Layout>
              <SafetyTimer />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/safety/safe-word" element={
          <ProtectedRoute>
            <Layout>
              <SafeWord />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/safety/risk-assessment" element={
          <ProtectedRoute>
            <Layout>
              <RiskAssessment />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/safety/escape-plan" element={
          <ProtectedRoute>
            <Layout>
              <EscapePlan />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/vault" element={
          <ProtectedRoute>
            <Layout>
              <Vault />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/vault/documents" element={
          <ProtectedRoute>
            <Layout>
              <DocumentVault />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/peer-support" element={
          <ProtectedRoute>
            <Layout>
              <PeerSupport />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/support-groups" element={
          <ProtectedRoute>
            <Layout>
              <SupportGroups />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/education" element={
          <ProtectedRoute>
            <Layout>
              <Education />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/subscriptions" element={
          <ProtectedRoute>
            <Layout>
              <Subscriptions />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/scorecards" element={
          <ProtectedRoute>
            <Layout>
              <Scorecards />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <Admin />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
      <EmergencyButton />
      <Chatbot />
    </GoogleAuthProvider>
  );
}

export default App;
