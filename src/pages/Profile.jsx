import React from 'react';
import { Card, Form, Input, Button, Avatar, message } from 'antd';
import { User, Lock, Mail } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useAuth } from '../hooks/useAuth';
import { changePassword } from '../api/auth';
import { useApiMutation } from '../hooks/useApi';

export const Profile = () => {
  const { user, role } = useAuth();
  const [form] = Form.useForm();

  const changePwdMutation = useApiMutation(
    (data) => changePassword(data),
    {
      successMessage: 'Password successfully updated.',
      onSuccess: () => form.resetFields()
    }
  );

  const handleSubmit = (values) => {
    changePwdMutation.mutate({
      old_password: values.oldPassword,
      new_password: values.newPassword
    });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">Your Profile</h1>
          <p className="text-brand-muted text-sm mt-1">Manage your secure credentials and password protection settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Details Card */}
          <Card className="glass-panel border-none shadow-glass rounded-2xl p-4 md:col-span-5 text-center space-y-4">
            <Avatar size={64} icon={<User className="w-8 h-8 text-brand-primary" />} className="bg-brand-primary/10 mx-auto" />
            <div>
              <h3 className="font-extrabold text-brand-dark text-base">{user?.username}</h3>
              <p className="text-xs text-brand-muted mt-0.5">{user?.email || 'No email attached'}</p>
              <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary font-bold text-[10px] rounded-full mt-3 uppercase tracking-wider">
                {role} Account
              </span>
            </div>
          </Card>

          {/* Change Password Card */}
          <Card className="glass-panel border-none shadow-glass rounded-2xl p-4 md:col-span-7">
            <h3 className="font-bold text-brand-dark text-base mb-4 flex items-center gap-1.5"><Lock className="w-5 h-5 text-brand-primary" /> Change Password</h3>
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
              <Form.Item
                name="oldPassword"
                label={<span className="text-brand-dark font-medium">Current Password</span>}
                rules={[{ required: true, message: 'Please enter current password!' }]}
              >
                <Input.Password className="h-10 rounded-lg" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={<span className="text-brand-dark font-medium">New Password</span>}
                rules={[
                  { required: true, message: 'Please enter new password!' },
                  { min: 8, message: 'Password must be at least 8 characters!' }
                ]}
              >
                <Input.Password className="h-10 rounded-lg" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={changePwdMutation.isPending}
                className="w-full h-10 bg-brand-primary border-none text-white rounded-xl font-bold flex items-center justify-center shadow-md"
              >
                Update Password
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
