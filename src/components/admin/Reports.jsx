import React from 'react';
import { Card, Table, Tag, Button, Select, message } from 'antd';
import { FileText, AlertCircle } from 'lucide-react';
import { getAdminReports, updateAdminReportStatus } from '../../api/admin';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';
import { formatDateTime } from '../../utils/helpers';

const { Option } = Select;

export const Reports = () => {
  const { data: reports, isLoading, refetch } = useApiQuery(
    ['admin-reports'],
    getAdminReports,
    {
      initialData: [
        { id: '1', category: 'IPV', urgency: 'CRITICAL', county: 'Nairobi', status: 'In Review', created_at: new Date().toISOString() },
        { id: '2', category: 'Stalking', urgency: 'MEDIUM', county: 'Mombasa', status: 'Received', created_at: new Date().toISOString() }
      ]
    }
  );

  const statusMutation = useApiMutation(
    ({ id, status }) => updateAdminReportStatus(id, status),
    {
      successMessage: 'Report status updated.',
      onSuccess: () => refetch()
    }
  );

  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">Global Safety Reports Manager</h3>
      </div>

      <Table
        dataSource={reports}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        className="custom-table"
        columns={[
          {
            title: 'Report ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <span className="font-bold text-brand-dark text-xs">#{text}</span>
          },
          {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <span className="text-xs font-semibold">{text}</span>
          },
          {
            title: 'Urgency',
            dataIndex: 'urgency',
            key: 'urgency',
            render: (urgency) => (
              <Tag color={urgency === 'CRITICAL' ? 'red' : 'blue'} className="text-[10px] font-bold">
                {urgency}
              </Tag>
            )
          },
          {
            title: 'County Location',
            dataIndex: 'county',
            key: 'county',
            render: (text) => <span className="text-xs font-semibold">{text}</span>
          },
          {
            title: 'Status Mapped',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
              <Select
                value={status}
                onChange={(val) => handleStatusChange(record.id, val)}
                className="w-36 text-xs h-8"
              >
                <Option value="Received">Received</Option>
                <Option value="In Review">In Review</Option>
                <Option value="Assigned">Assigned</Option>
                <Option value="Resolved">Resolved</Option>
              </Select>
            )
          },
          {
            title: 'Filed At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => <span className="text-[10px] text-brand-muted">{formatDateTime(text)}</span>
          }
        ]}
      />
    </Card>
  );
};

export default Reports;
