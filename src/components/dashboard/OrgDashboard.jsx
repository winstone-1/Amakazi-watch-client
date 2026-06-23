import React, { useState } from 'react';
import { Card, Table, Tag, Button, Statistic, Progress, Badge, message } from 'antd';
import { ShieldCheck, Plus, MessageSquare, Briefcase, RefreshCw, Send } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export const OrgDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('cases');

  const stats = [
    { title: 'Total Cases Managed', value: 87, prefix: <ShieldCheck className="w-5 h-5 text-brand-primary" /> },
    { title: 'Active Counselors', value: 12, suffix: '/ 15' },
    { title: 'Bed Occupancy', value: '78%', suffix: '14/18 free' },
  ];

  const caseData = [
    { key: '1', id: 'REP-1920', type: 'Intimate Partner Violence', location: 'Nairobi County', date: 'Today, 10:14 AM', urgency: 'CRITICAL', status: 'In Review' },
    { key: '2', id: 'REP-1912', type: 'Stalking & Harassment', location: 'Mombasa County', date: 'Yesterday, 3:30 PM', urgency: 'MEDIUM', status: 'Pending Assignment' },
    { key: '3', id: 'REP-1890', type: 'Physical Assault', location: 'Kiambu County', date: '22 Oct 2025', urgency: 'HIGH', status: 'Resolved' },
  ];

  const inventoryData = [
    { key: '1', item: 'Temporary Shelter Beds', available: 4, limit: 18, type: 'Spaces' },
    { key: '2', item: 'Crisis Counseling Slots', available: 6, limit: 15, type: 'Hours' },
    { key: '3', item: 'Legal Aid Consultations', available: 12, limit: 30, type: 'Slots' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            Organization Coordinator Dashboard
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            SafeHaven Kenya • Nairobi Regional Office
          </p>
        </div>
        <Button icon={<RefreshCw className="w-4 h-4" />} className="flex items-center gap-1.5 border-brand-peach/40">
          Sync Queue
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <Card key={idx} className="glass-panel border-none shadow-glass rounded-2xl">
            <Statistic
              title={<span className="text-brand-muted font-bold text-xs uppercase tracking-wider">{item.title}</span>}
              value={item.value}
              prefix={item.prefix}
              suffix={<span className="text-brand-muted text-sm ml-1 font-medium">{item.suffix}</span>}
              valueStyle={{ color: '#2c2220', fontWeight: '800', fontSize: '28px' }}
            />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main interactive block */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="glass-panel border-none shadow-glass rounded-2xl">
            {/* Tabs */}
            <div className="flex border-b border-brand-peach/20 mb-4 pb-1">
              <button
                onClick={() => setActiveTab('cases')}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
                  activeTab === 'cases' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-muted hover:text-brand-dark'
                }`}
              >
                Assigned Cases Queue
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all ${
                  activeTab === 'inventory' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-muted hover:text-brand-dark'
                }`}
              >
                Local Shelter Resources
              </button>
            </div>

            {/* Cases Tab */}
            {activeTab === 'cases' && (
              <Table
                dataSource={caseData}
                pagination={false}
                className="custom-table"
                columns={[
                  {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
                  },
                  {
                    title: 'Category',
                    dataIndex: 'type',
                    key: 'type',
                    render: (text) => <span className="text-xs font-semibold">{text}</span>
                  },
                  {
                    title: 'Urgency',
                    dataIndex: 'urgency',
                    key: 'urgency',
                    render: (urgency) => (
                      <Tag color={urgency === 'CRITICAL' ? 'red' : urgency === 'HIGH' ? 'orange' : 'blue'} className="text-[10px] font-bold">
                        {urgency}
                      </Tag>
                    )
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text) => <Tag color="processing">{text}</Tag>
                  },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: () => (
                      <Button size="small" type="primary" className="text-[10px] h-7 bg-brand-primary border-none">
                        Manage Case
                      </Button>
                    )
                  }
                ]}
              />
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-brand-muted">Item Type / Allocation Status</span>
                  <Button size="small" type="dashed" icon={<Plus className="w-3.5 h-3.5" />} className="flex items-center gap-1 text-xs">Add Item</Button>
                </div>
                {inventoryData.map((item) => (
                  <div key={item.key} className="p-4 rounded-xl bg-white/40 border border-brand-peach/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-dark text-sm">{item.item}</span>
                      <span className="text-xs font-semibold">{item.available} / {item.limit} {item.type}</span>
                    </div>
                    <Progress
                      percent={Math.round((item.available / item.limit) * 100)}
                      strokeColor="#e0533c"
                      trailColor="rgba(224, 83, 60, 0.1)"
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right side box (Volunteer Sync & Coordination Messages) */}
        <div className="lg:col-span-4 space-y-6">
          <Card
            title={<span className="font-bold text-brand-dark text-base">Coordination Chat</span>}
            className="glass-panel border-none shadow-glass rounded-2xl h-full flex flex-col justify-between"
          >
            <div className="space-y-3 h-80 overflow-y-auto mb-4 p-2 bg-white/30 rounded-xl">
              <div className="text-left">
                <div className="inline-block bg-brand-peach/40 text-brand-dark rounded-xl p-2.5 max-w-[90%] text-xs">
                  <p className="font-bold text-[10px] text-brand-primary">County Rep (Nairobi)</p>
                  <p className="mt-0.5">We have received 3 IPV alerts from Westlands today. Are any shelter units free?</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-brand-primary text-white rounded-xl p-2.5 max-w-[90%] text-xs text-left">
                  <p className="font-bold text-[10px] text-white/80">You</p>
                  <p className="mt-0.5">Yes, we have 4 temporary shelter spaces open. Send them over.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Type coordination message..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-brand-peach/40 bg-white/80 focus:outline-none focus:border-brand-primary"
              />
              <Button type="primary" icon={<Send className="w-4 h-4" />} className="h-9 rounded-xl bg-brand-primary border-none flex items-center justify-center" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;
