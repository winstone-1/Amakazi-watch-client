import React from 'react';
import { Card, Table, Tag, Button, message } from 'antd';
import { ShieldCheck, Check, X } from 'lucide-react';
import { getAdminOrganisations, verifyAdminOrganisation } from '../../api/admin';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';

export const Organisations = () => {
  const { data: orgs, isLoading, refetch } = useApiQuery(
    ['admin-orgs'],
    getAdminOrganisations,
    {
      initialData: [
        { id: '1', name: 'SafeHaven Kenya', registration_no: 'NGO-89240', county: 'Nairobi', status: 'Pending Verification' },
        { id: '2', name: 'Mombasa Women Refuge', registration_no: 'NGO-12049', county: 'Mombasa', status: 'Verified' }
      ]
    }
  );

  const verifyMutation = useApiMutation(
    ({ id, status }) => verifyAdminOrganisation(id, status),
    {
      successMessage: 'Organisation verification status adjusted.',
      onSuccess: () => refetch()
    }
  );

  const handleVerify = (id, status) => {
    verifyMutation.mutate({ id, status });
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">NGO Registry Moderation</h3>
      </div>

      <Table
        dataSource={orgs}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        className="custom-table"
        columns={[
          {
            title: 'Organisation Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
          },
          {
            title: 'Registration No.',
            dataIndex: 'registration_no',
            key: 'registration_no',
            render: (text) => <span className="text-xs font-mono text-brand-muted">{text}</span>
          },
          {
            title: 'County Headquarters',
            dataIndex: 'county',
            key: 'county',
            render: (text) => <span className="text-xs font-semibold">{text}</span>
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
              <Tag color={status === 'Verified' ? 'success' : 'warning'} className="text-[10px] font-bold">
                {status}
              </Tag>
            )
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <div className="flex gap-2">
                <Button
                  size="small"
                  onClick={() => handleVerify(record.id, 'Verified')}
                  icon={<Check className="w-3.5 h-3.5 text-brand-success" />}
                  className="flex items-center justify-center p-1 border-brand-peach/40 hover:border-brand-success"
                  disabled={record.status === 'Verified'}
                >
                  Verify
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={() => handleVerify(record.id, 'Rejected')}
                  icon={<X className="w-3.5 h-3.5" />}
                  className="flex items-center justify-center p-1 border-brand-peach/40"
                >
                  Reject
                </Button>
              </div>
            )
          }
        ]}
      />
    </Card>
  );
};

export default Organisations;
