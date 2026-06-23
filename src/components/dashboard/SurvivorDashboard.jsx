import React, { useState } from 'react';
import { Card, Button, Timeline, Tag, message } from 'antd';
import { Shield, MessageSquare, BookOpen, Key, AlertTriangle, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/LanguageContext';
import { getGPSLocation } from '../../utils/helpers';
import api from '../../api/axios';

export const SurvivorDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sosLoading, setSosLoading] = useState(false);

  const handleImmediateSOS = async () => {
    setSosLoading(true);
    try {
      let coords = { latitude: 0, longitude: 0 };
      try {
        coords = await getGPSLocation();
      } catch (e) {
        console.warn('Geolocation failed/denied, sending SOS alert without GPS');
      }

      await api.post('safety/timer/start/', {
        duration_seconds: 0,
        latitude: coords.latitude,
        longitude: coords.longitude,
        is_sos: true,
      });

      message.success('Emergency SOS Alert Sent Successfully! Responders are tracking your device.');
    } catch (err) {
      message.error('Failed to trigger SOS. Please call 1195 directly.');
    } finally {
      setSosLoading(false);
    }
  };

  const activeReports = [
    {
      id: 'Case #1920',
      type: 'Domestic Safety',
      status: 'Reviewed & Active',
      statusColor: 'success',
      org: 'SafeHaven Kenya',
    },
    {
      id: 'Case #1912',
      type: 'Legal Aid Request',
      status: 'Pending Assignment',
      statusColor: 'warning',
      org: 'Legal Aid Society',
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
          Your Safe Space Dashboard
        </h1>
        <p className="text-brand-muted text-sm mt-1">
          Welcome back. You are in a secure environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Emergency SOS + Quick Links) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Emergency Assistance card */}
          <Card className="glass-panel border-none shadow-glass rounded-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-brand-primary" />
                  Emergency Assistance
                </h3>
                <p className="text-xs text-brand-muted max-w-md">
                  If you are in immediate danger, use the SOS button. This will alert your designated emergency contacts and local responders.
                </p>
              </div>
              <Button
                type="primary"
                danger
                loading={sosLoading}
                onClick={handleImmediateSOS}
                className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold bg-brand-primary border-none shadow-lg text-white"
              >
                {t('activateSos') || 'Activate SOS'}
              </Button>
            </div>
          </Card>

          {/* Quick modules Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card
              hoverable
              onClick={() => navigate('/safety')}
              className="glass-panel-light border-none text-center rounded-2xl py-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-success/15 text-brand-success flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5" />
              </div>
              <p className="font-bold text-brand-dark text-xs">{t('safety')}</p>
            </Card>

            <Card
              hoverable
              onClick={() => navigate('/peer-support')}
              className="glass-panel-light border-none text-center rounded-2xl py-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="font-bold text-brand-dark text-xs">{t('peerSupport')}</p>
            </Card>

            <Card
              hoverable
              onClick={() => navigate('/legal-bot')}
              className="glass-panel-light border-none text-center rounded-2xl py-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="font-bold text-brand-dark text-xs">{t('legalBot')}</p>
            </Card>

            <Card
              hoverable
              onClick={() => navigate('/education')}
              className="glass-panel-light border-none text-center rounded-2xl py-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="font-bold text-brand-dark text-xs">{t('browseResources')}</p>
            </Card>
          </div>

          {/* Timeline of Interactions */}
          <Card
            title={<span className="font-bold text-brand-dark text-base">{t('timelineInteractions')}</span>}
            className="glass-panel border-none shadow-glass rounded-2xl"
          >
            <Timeline
              items={[
                {
                  color: 'green',
                  children: (
                    <div className="space-y-1">
                      <p className="text-[10px] text-brand-muted">Today, 10:14 AM</p>
                      <p className="font-semibold text-brand-dark text-xs">Report Case #1920 Verified by NGO Responder</p>
                      <p className="text-xs text-brand-muted">Your report has been successfully reviewed by SafeHaven Kenya. They have assigned a caseworker to your profile.</p>
                      <Button size="small" type="dashed" className="mt-1 text-xs">Chat with Responder</Button>
                    </div>
                  ),
                },
                {
                  color: 'blue',
                  children: (
                    <div className="space-y-1">
                      <p className="text-[10px] text-brand-muted">Yesterday, 3:30 PM</p>
                      <p className="font-semibold text-brand-dark text-xs">Submitted Legal Aid Request</p>
                      <p className="text-xs text-brand-muted">You initiated a request for free legal representation regarding Case #1912.</p>
                    </div>
                  ),
                },
                {
                  color: 'gray',
                  children: (
                    <div className="space-y-1">
                      <p className="text-[10px] text-brand-muted">Oct 24, 2025</p>
                      <p className="font-semibold text-brand-dark text-xs">Vault Credentials Updated</p>
                      <p className="text-xs text-brand-muted">Your secure encryption keys for the digital vault were updated successfully.</p>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>

        {/* Right Column (Reports Status Tracking) */}
        <div className="lg:col-span-4">
          <Card
            title={<span className="font-bold text-brand-dark text-base">{t('reportStatus')}</span>}
            extra={<Button type="link" size="small" className="text-brand-primary p-0 font-bold" onClick={() => navigate('/reports')}>View All</Button>}
            className="glass-panel border-none shadow-glass rounded-2xl h-full"
          >
            <div className="space-y-4">
              {activeReports.map((report) => (
                <div key={report.id} className="p-4 rounded-xl bg-white/60 border border-brand-peach/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-dark text-xs">{report.id}</span>
                    <Tag color={report.statusColor}>{report.status}</Tag>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-dark">{report.type}</p>
                    <p className="text-[10px] text-brand-muted mt-0.5">Assigned to: {report.org}</p>
                  </div>
                  <Button
                    size="small"
                    className="w-full flex items-center justify-center gap-1 text-[11px] text-brand-primary border-brand-primary/20 hover:border-brand-primary"
                    onClick={() => navigate(`/reports/${report.id.replace('#', '')}`)}
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SurvivorDashboard;
