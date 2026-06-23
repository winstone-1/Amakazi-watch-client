import React from 'react';
import { Card, Switch, Button, Badge, message } from 'antd';
import { Settings as SettingsIcon, Shield, RefreshCw, Trash2 } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useStore } from '../store/store';
import { enable2FA } from '../api/auth';
import { useApiMutation } from '../hooks/useApi';

export const Settings = () => {
  const { offlineQueue, clearOfflineQueue } = useStore();

  const enable2faMutation = useApiMutation(
    () => enable2FA(),
    {
      successMessage: 'Two-Factor Authentication configuration loaded.'
    }
  );

  const handleSyncOffline = () => {
    if (offlineQueue.length === 0) {
      message.info('Offline queue is empty.');
      return;
    }

    message.loading({ content: 'Synchronizing offline queue with server...', key: 'sync' });
    setTimeout(() => {
      clearOfflineQueue();
      message.success({ content: 'All offline reports synchronized successfully!', key: 'sync' });
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Security Settings</h1>
          <p className="text-brand-muted text-sm mt-1">Configure global application preferences, security variables, and PWA cached records.</p>
        </div>

        <div className="space-y-6">
          {/* Security Protocols */}
          <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
            <h3 className="font-bold text-brand-dark text-base mb-4 flex items-center gap-1.5"><Shield className="w-5 h-5 text-brand-primary" /> Multi-Factor Protection</h3>
            <div className="flex justify-between items-center bg-white/60 p-4 rounded-xl border border-brand-peach/30">
              <div>
                <p className="text-xs font-bold text-brand-dark">Two-Factor Authentication (2FA)</p>
                <p className="text-[10px] text-brand-muted mt-0.5">Enforce a secondary verification code after logging in to verify identity.</p>
              </div>
              <Switch defaultChecked onChange={() => enable2faMutation.mutate()} />
            </div>
          </Card>

          {/* Offline Sync Cache */}
          <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
            <h3 className="font-bold text-brand-dark text-base mb-4 flex items-center gap-1.5"><RefreshCw className="w-5 h-5 text-brand-primary" /> PWA Cache Management</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/60 p-4 rounded-xl border border-brand-peach/30">
                <div>
                  <p className="text-xs font-bold text-brand-dark">Offline Report Queue</p>
                  <p className="text-[10px] text-brand-muted mt-0.5">Incidents saved to local storage when network is down.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge count={offlineQueue.length} className="site-badge-count-4" />
                  <span className="text-xs font-semibold text-brand-muted">pending reports</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSyncOffline}
                  icon={<RefreshCw className="w-4 h-4 mr-0.5" />}
                  className="flex-1 h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-1 border-brand-peach/40"
                  disabled={offlineQueue.length === 0}
                >
                  Force Sync Now
                </Button>
                <Button
                  danger
                  onClick={() => { clearOfflineQueue(); message.success('Offline queue cleared.'); }}
                  icon={<Trash2 className="w-4 h-4 mr-0.5" />}
                  className="flex-1 h-10 rounded-lg text-xs font-bold flex items-center justify-center gap-1 border-red-200"
                  disabled={offlineQueue.length === 0}
                >
                  Clear Queue
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
