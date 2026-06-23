import React from 'react';
import { Card, Tag, Button, List } from 'antd';
import { FileText, Eye, AlertCircle, WifiOff } from 'lucide-react';
import { useStore } from '../../store/store';
import { useApiQuery } from '../../hooks/useApi';
import { getReports } from '../../api/reports';
import { formatDateTime } from '../../utils/helpers';

export const ReportList = ({ onViewDetail }) => {
  const offlineQueue = useStore((state) => state.offlineQueue);

  const { data: serverReports, isLoading, refetch } = useApiQuery(
    ['reports'],
    getReports,
    {
      initialData: [],
      onError: () => {
        console.warn('Unable to load reports from server, showing offline items only.');
      }
    }
  );

  const displayReports = [
    // Prepend offline reports with special indicator badges
    ...offlineQueue.map((report) => ({
      ...report,
      id: report.id,
      isOffline: true,
      created_at: new Date().toISOString(),
      status: 'Queued Offline',
    })),
    ...(serverReports || [])
  ];

  return (
    <Card className="glass-panel border-none shadow-glass rounded-3xl p-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-base font-bold text-brand-dark">Filed Reports</h3>
        <Button size="small" className="text-xs border-brand-peach/40" onClick={() => refetch()}>Refresh</Button>
      </div>

      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={displayReports}
        renderItem={(item) => (
          <List.Item
            className="p-4 border-b border-brand-peach/20 hover:bg-white/30 rounded-xl transition-all"
            actions={[
              <Button
                key="view"
                type="link"
                size="small"
                onClick={() => onViewDetail && onViewDetail(item.id)}
                icon={<Eye className="w-4 h-4 text-brand-primary" />}
                className="flex items-center gap-1 text-xs font-bold"
                disabled={item.isOffline}
              >
                View
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.isOffline ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-primary/10 text-brand-primary'}`}>
                  {item.isOffline ? <WifiOff className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
              }
              title={
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-dark text-xs">{item.id}</span>
                  <Tag color={item.isOffline ? 'orange' : item.urgency === 'CRITICAL' ? 'red' : 'processing'} className="text-[9px] uppercase font-extrabold px-1.5">
                    {item.isOffline ? 'Offline Queue' : item.status || 'Received'}
                  </Tag>
                </div>
              }
              description={
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs font-medium text-brand-dark">{item.category === 'IPV' ? 'Intimate Partner Violence' : item.category || 'Incident File'}</p>
                  <p className="text-[10px] text-brand-muted">Filed: {formatDateTime(item.created_at)} • Location: {item.county || 'Unspecified'}</p>
                </div>
              }
            />
          </List.Item>
        )}
        locale={{
          emptyText: (
            <div className="text-center py-8 space-y-2">
              <AlertCircle className="w-8 h-8 text-brand-muted mx-auto" />
              <p className="text-xs font-medium text-brand-dark">No reports filed yet.</p>
              <p className="text-[10px] text-brand-muted">Securely file your first incident report using the wizard above.</p>
            </div>
          )
        }}
      />
    </Card>
  );
};

export default ReportList;
