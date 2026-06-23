import React from 'react';
import { Card, Table, Select, Button, message } from 'antd';
import { User, Trash2 } from 'lucide-react';
import { getAdminUsers, updateAdminUserRole, deleteAdminUser } from '../../api/admin';
import { useApiQuery, useApiMutation } from '../../hooks/useApi';

const { Option } = Select;

export const Users = () => {
  const { data: users, isLoading, refetch } = useApiQuery(
    ['admin-users'],
    getAdminUsers,
    {
      initialData: [
        { id: '1', username: 'winst', email: 'winst@amakazi.org', role: 'Admin' },
        { id: '2', username: 'survivor1', email: 'anonymous@amakazi.org', role: 'Survivor' },
        { id: '3', username: 'jane_counselor', email: 'jane@safehaven.or.ke', role: 'Counselor' }
      ]
    }
  );

  const roleMutation = useApiMutation(
    ({ id, role }) => updateAdminUserRole(id, role),
    {
      successMessage: 'User role updated successfully.',
      onSuccess: () => refetch()
    }
  );

  const deleteMutation = useApiMutation(
    (id) => deleteAdminUser(id),
    {
      successMessage: 'User account removed.',
      onSuccess: () => refetch()
    }
  );

  const handleRoleChange = (id, role) => {
    roleMutation.mutate({ id, role });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <Card className="glass-panel border-none shadow-glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-brand-dark text-base">User Directory Moderator</h3>
      </div>

      <Table
        dataSource={users}
        loading={isLoading}
        pagination={false}
        rowKey="id"
        className="custom-table"
        columns={[
          {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <span className="font-bold text-brand-dark text-xs">{text}</span>
          },
          {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <span className="text-xs text-brand-muted">{text}</span>
          },
          {
            title: 'Current Role',
            dataIndex: 'role',
            key: 'role',
            render: (role, record) => (
              <Select
                value={role}
                onChange={(val) => handleRoleChange(record.id, val)}
                className="w-36 text-xs h-8"
              >
                <Option value="Survivor">Survivor</Option>
                <Option value="Counselor">Counselor</Option>
                <Option value="Org Staff">Org Staff</Option>
                <Option value="County Official">County Official</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            )
          },
          {
            title: 'Delete Action',
            key: 'actions',
            render: (_, record) => (
              <Button size="small" type="text" danger onClick={() => handleDelete(record.id)} className="flex items-center justify-center p-1 text-brand-muted hover:text-brand-primary">
                <Trash2 className="w-4 h-4" />
              </Button>
            )
          }
        ]}
      />
    </Card>
  );
};

export default Users;
