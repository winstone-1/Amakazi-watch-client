import React from 'react';
import { Card, Table, Tag, Button, message } from 'antd';
import { ShieldCheck, MapPin } from 'lucide-react';
import { getCaseMatches } from '../../api/org';
import { useApiQuery } from '../../hooks/useApi';

export const CaseMatching = () => {
  const { data: matches, isLoading } = useApiQuery(
    ['case-matches'],
    getCaseMatches,
    {
      initialData: [
        { key: '1', id: 'REP-1920', category: 'IPV', county: 'Nairobi', sub_county: 'Westlands', date: '10 mins ago', distance: '1.2 km away' },
        { key: '2', id: 'REP-1912', category: 'Stalking', county: 'Nairobi', sub_county: 'Kasarani', date: '1 hour ago', distance: '8.4 km away' }
      ]
    }
  );

  const handleAccept = (id) => {
    message.success(`Case ${id} successfully accepted and assigned to your caseworker roster.`);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">County Incident Matching Queue</h3>
      </div>

      <Table
        dataSource={matches}
        loading={isLoading}
        pagination={false}
        className="custom-table"
        columns={[
          {
            title: 'Report ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag color="blue" className="text-[10px] font-bold">{text}</Tag>
          },
          {
            title: 'Location Area',
            key: 'location',
            render: (_, record) => (
              <span className="text-xs">
                {record.county} • {record.sub_county}
              </span>
            )
          },
          {
            title: 'Time Elapsed',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <span className="text-xs text-brand-muted">{text}</span>
          },
          {
            title: 'Audit Distance',
            dataIndex: 'distance',
            key: 'distance',
            render: (text) => (
              <span className="text-[10px] text-brand-success font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {text}
              </span>
            )
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Button size="small" type="primary" onClick={() => handleAccept(record.id)} className="bg-brand-primary border-none rounded-lg text-xs">
                Accept Case
              </Button>
            )
          }
        ]}
      />
    </Card>
  );
};

export default CaseMatching;
