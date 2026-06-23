import React, { useState } from 'react';
import { Card, Table, Tag, Input, Button, Progress, message } from 'antd';
import { Award, Search, KeyRound, Terminal, AlertTriangle } from 'lucide-react';
import Layout from '../components/common/Layout';
import { getCountyRankings, getCountyScorecard } from '../api/content';
import { useApiQuery } from '../hooks/useApi';

export const Scorecards = () => {
  const [selectedCounty, setSelectedCounty] = useState('Nairobi');
  const [apiKey, setApiKey] = useState('amakazi-intel-sec-key');
  const [intelQuery, setIntelQuery] = useState('/intelligence/alerts/?county=Nairobi');
  const [consoleLogs, setConsoleLogs] = useState([
    'System: Intelligence Console Initialized.',
    'Status: X-API-Key Header Loaded successfully.'
  ]);
  const [querying, setQuerying] = useState(false);

  const { data: rankings, isLoading } = useApiQuery(
    ['county-rankings'],
    getCountyRankings,
    {
      initialData: [
        { key: '1', rank: 1, name: 'Kiambu County', safety_score: 94, response_time: '12 mins', status: 'Optimal' },
        { key: '2', rank: 2, name: 'Mombasa County', safety_score: 91, response_time: '15 mins', status: 'Optimal' },
        { key: '3', rank: 3, name: 'Nairobi County', safety_score: 87, response_time: '18 mins', status: 'Good' },
        { key: '4', rank: 4, name: 'Kwale County', safety_score: 72, response_time: '28 mins', status: 'Needs Audit' },
      ]
    }
  );

  const { data: scorecard, refetch: refetchScorecard } = useApiQuery(
    ['scorecard', selectedCounty],
    () => getCountyScorecard(selectedCounty),
    {
      initialData: {
        county: 'Nairobi',
        general_safety_score: 87,
        total_responders: 14,
        response_rate: '94%',
        active_shelters: 8,
        hotspots: ['Westlands', 'Kasarani', 'Kibra']
      }
    }
  );

  const handleQueryIntel = () => {
    if (!apiKey) {
      message.error('Please input your X-API-Key credential.');
      return;
    }
    setQuerying(true);
    setConsoleLogs(prev => [...prev, `> GET ${intelQuery}`, `Authorization: X-API-Key ${apiKey.substring(0, 8)}...`]);

    setTimeout(() => {
      setQuerying(false);
      setConsoleLogs(prev => [
        ...prev,
        'Response [200 OK]:',
        JSON.stringify({
          county: 'Nairobi',
          alerts: [
            { id: 'ALT-1', type: 'SOS Trigger Spike', area: 'Kibera', timestamp: new Date().toISOString() }
          ],
          systemStatus: 'NOMINAL'
        }, null, 2),
        'System: Log closed.'
      ]);
    }, 1200);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">County Analytics Console</h1>
          <p className="text-brand-muted text-sm mt-1">Official portal for county safety monitoring, response auditing, and intelligence integrations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* County rankings */}
          <div className="lg:col-span-8">
            <Card
              title={<span className="font-bold text-brand-dark text-base flex items-center gap-1.5"><Award className="w-5 h-5 text-brand-primary" /> Safety Response Rankings</span>}
              className="glass-panel border-none shadow-glass rounded-2xl"
            >
              <Table
                dataSource={rankings}
                loading={isLoading}
                pagination={false}
                className="custom-table"
                onRow={(record) => ({
                  onClick: () => {
                    setSelectedCounty(record.name.replace(' County', ''));
                    refetchScorecard();
                  }
                })}
                rowClassName="cursor-pointer hover:bg-brand-peach/10"
                columns={[
                  {
                    title: 'Rank',
                    dataIndex: 'rank',
                    key: 'rank',
                    render: (text) => <span className="font-bold text-brand-dark text-xs">#{text}</span>
                  },
                  {
                    title: 'County Name',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
                  },
                  {
                    title: 'Safety Index',
                    dataIndex: 'safety_score',
                    key: 'safety_score',
                    render: (score) => (
                      <div className="flex items-center gap-2">
                        <Progress percent={score} size="small" strokeColor="#e0533c" showInfo={false} className="w-20" />
                        <span className="text-xs font-bold">{score}%</span>
                      </div>
                    )
                  },
                  {
                    title: 'Avg. Dispatch Time',
                    dataIndex: 'response_time',
                    key: 'response_time',
                    render: (text) => <span className="text-xs font-semibold">{text}</span>
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

          {/* County Scorecard display */}
          <div className="lg:col-span-4 space-y-6">
            <Card
              title={<span className="font-bold text-brand-dark text-base">{selectedCounty} County Scorecard</span>}
              className="glass-panel border-none shadow-glass rounded-2xl"
            >
              <div className="space-y-4 text-xs font-medium text-brand-dark">
                <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-xl border border-brand-peach/35">
                  <span className="text-brand-muted">Safety Score Index</span>
                  <span className="font-bold text-brand-primary text-sm">{scorecard.general_safety_score}%</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-xl border border-brand-peach/35">
                  <span className="text-brand-muted">Active Responders</span>
                  <span className="font-bold text-brand-dark">{scorecard.total_responders} units</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-xl border border-brand-peach/35">
                  <span className="text-brand-muted">Dispatch Success Rate</span>
                  <span className="font-bold text-brand-success">{scorecard.response_rate}</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 p-2.5 rounded-xl border border-brand-peach/35">
                  <span className="text-brand-muted">Crisis Safe Houses</span>
                  <span className="font-bold text-brand-dark">{scorecard.active_shelters} spots</span>
                </div>

                <div className="border-t border-brand-peach/15 pt-3">
                  <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider mb-2 block">Identified High-Alert Subcounties</span>
                  <div className="flex flex-wrap gap-1.5">
                    {scorecard.hotspots.map(h => (
                      <Tag key={h} color="red" className="text-[10px] font-bold">{h}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* REST Intelligence API Console */}
        <Card
          title={<span className="font-bold text-brand-dark text-base flex items-center gap-1.5"><Terminal className="w-5 h-5 text-brand-primary" /> Intelligence REST API Query Tool</span>}
          className="glass-panel border-none shadow-glass rounded-2xl mt-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs text-brand-muted">
                Input your official `X-API-Key` credential and execute requests directly against our encrypted intelligence server database.
              </p>

              <div className="space-y-3">
                <Input
                  prefix={<KeyRound className="w-4 h-4 text-brand-muted mr-1" />}
                  placeholder="X-API-Key value"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="h-10 rounded-lg"
                />
                <Input
                  prefix={<span className="text-xs text-brand-muted mr-1">GET</span>}
                  value={intelQuery}
                  onChange={(e) => setIntelQuery(e.target.value)}
                  className="h-10 rounded-lg font-mono text-xs"
                />
                <Button
                  type="primary"
                  onClick={handleQueryIntel}
                  loading={querying}
                  className="w-full h-10 rounded-lg bg-brand-primary border-none text-white font-bold"
                >
                  Execute Query
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-brand-dark text-white p-4 rounded-xl font-mono text-[11px] h-60 overflow-y-auto space-y-1">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('Response') ? 'text-brand-success' : log.startsWith('>') ? 'text-brand-primary' : 'text-white'}>
                  <pre className="whitespace-pre-wrap">{log}</pre>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Scorecards;
