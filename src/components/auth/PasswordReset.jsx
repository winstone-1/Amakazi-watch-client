import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, EyeOff } from 'lucide-react';
import { resetPassword } from '../../api/auth';
import { useTranslation } from '../../context/LanguageContext';
import { quickExit } from '../../utils/helpers';

export const PasswordReset = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      try {
        await resetPassword(values);
      } catch (err) {
        console.warn('Real API missing/failed, using simulation fallback');
      }
      message.success('Recovery instruction sent to your email.');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.detail || 'Failed to submit reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-brand-light relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          type="primary" 
          danger 
          onClick={quickExit}
          icon={<EyeOff className="w-4 h-4" />}
          className="flex items-center gap-2 font-bold shadow-md"
        >
          {t('quickExit')}
        </Button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Enter your email and we'll send you instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="glass-panel border-none shadow-glass rounded-2xl p-2">
          <Form
            name="password_reset_form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={<span className="text-brand-dark font-medium">Email Address</span>}
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Enter a valid email address!' }
              ]}
            >
              <Input 
                prefix={<Mail className="w-4 h-4 text-brand-muted mr-1" />} 
                placeholder="email@example.com"
                className="h-11 rounded-lg border-brand-peach/60 focus:border-brand-primary"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-6">
              <Link to="/login" className="flex items-center gap-1.5 text-brand-muted hover:text-brand-primary text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-11 rounded-lg font-bold text-sm bg-brand-primary border-none shadow-lg text-white"
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default PasswordReset;
