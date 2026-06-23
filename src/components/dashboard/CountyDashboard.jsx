import React from 'react';
import { Card, Statistic, Table, Progress, Tag, Button } from 'antd';
import { ShieldCheck, Award, MapPin, Database, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const CountyDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { title: 'Response Efficiency Rating', value: '92.4%', prefix: <Award className="w-5 h-5 text-brand-success" /> },
    { title: 'Current County Rank', value: '#3', suffix: 'out of 47' },
    { title: 'Verified Safe Centers', value: 24, prefix: <ShieldCheck className="w-5 h-5 text-brand-primary" /> },
  ];

  const subCountyPerformance = [
    { key: '1', name: 'Westlands Sub-County', cases: 210, rating: 96, status: 'Optimal' },
    { key: '2', name: 'Kasarani Sub-County', cases: 340, rating: 88, status: 'Good' },
    { key: '3', name: 'Kibra Sub-County', cases: 412, rating: 74, status: 'Needs Improvement' },
    { key: '4', name: 'Starehe Sub-County', cases: 290, rating: 91, status: 'Optimal' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            County Analytics & Safety Scorecard
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            Official Console • Nairobi County Government
          </p>
        </div>
        <Button
          type="primary"
          icon={<Database className="w-4 h-4" />}
          className="flex items-center gap-1.5 bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold border-none"
          onClick={() => navigate('/scorecards')}
        >
          Intelligence API Console
        </Button>
      </div>

      {/* KPI Stats */}
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
        {/* Sub-County rankings Table */}
        <div className="lg:col-span-8">
          <Card
            title={<span className="font-bold text-brand-dark text-base">Regional Response Metrics</span>}
            className="glass-panel border-none shadow-glass rounded-2xl"
          >
            <Table
              dataSource={subCountyPerformance}
              pagination={false}
              className="custom-table"
              columns={[
                {
                  title: 'Sub-County Region',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
                },
                {
                  title: 'Reports Registered',
                  dataIndex: 'cases',
                  key: 'cases',
                  render: (text) => <span className="text-xs font-semibold">{text}</span>
                },
                {
                  title: 'Response Score',
                  dataIndex: 'rating',
                  key: 'rating',
                  render: (rating) => (
                    <div className="flex items-center gap-2">
                      <Progress percent={rating} size="small" strokeColor="#10b981" showInfo={false} className="w-24" />
                      <span className="text-xs font-bold">{rating}%</span>
                    </div>
                  )
                },
                {
                  title: 'Audit Status',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => (
                    <Tag color={status === 'Optimal' ? 'success' : status === 'Good' ? 'processing' : 'warning'} className="text-[10px] font-bold">
                      {status}
                    </Tag>
                  )
                }
              ]}
            />
          </Card>
        </div>

        {/* Action Panel / Hotspots overview */}
        <div className="lg:col-span-4 space-y-6">
          <Card
            title={<span className="font-bold text-brand-dark text-base">Nairobi Critical Alerts</span>}
            className="glass-panel border-none shadow-glass rounded-2xl"
          >
            <div className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs text-red-700 font-bold">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    Immediate Priority
                  </span>
                  <span>14 mins ago</span>
                </div>
                <p className="text-xs font-semibold text-brand-dark">Kibera SOS Spike Detected</p>
                <p className="text-[10px] text-brand-muted">3 SOS triggers matching coordinates around Kibera. NGO dispatch team initiated.</p>
              </div>

              <div className="p-3 bg-brand-peach/30 border border-brand-peach/50 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs text-brand-dark font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                    Resource Shortage
                  </span>
                  <span>2 hours ago</span>
                </div>
                <p className="text-xs font-semibold text-brand-dark">Kasarani Shelters Full</p>
                <p className="text-[10px] text-brand-muted">Crisis shelter beds in Kasarani subcounty are reporting 100% capacity.</p>
              </div>
            </div>

            <Button
              className="w-full mt-6 flex items-center justify-center gap-1 text-xs font-semibold text-brand-primary border-brand-primary/20 hover:border-brand-primary h-10 rounded-xl"
              onClick={() => navigate('/scorecards')}
            >
              Analyze County Heatmap
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CountyDashboard;
