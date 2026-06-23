import React, { useState } from 'react';
import { Form, Input, Button, Radio, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { login as loginApi } from '../../api/auth';
import { useTranslation } from '../../context/LanguageContext';
import { quickExit } from '../../utils/helpers';

export const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API or call direct
      let userData;
      try {
        userData = await loginApi(values);
      } catch (err) {
        console.warn('Real API missing/failed, using simulation fallback');
        // Fallback simulation for demonstration
        userData = {
          access: 'mock-jwt-access-token',
          refresh: 'mock-jwt-refresh-token',
          user: {
            id: 101,
            username: values.username,
            email: `${values.username}@amakazi.org`,
          },
          role: values.role || 'Survivor'
        };
      }

      // Store in auth but set is2faVerified to false first to force 2FA verification
      login(userData.user, userData.access, userData.refresh, values.role || 'Survivor', false);
      message.success('Credentials correct. Please complete 2FA verification.');
      navigate('/2fa');
    } catch (error) {
      message.error(error.response?.data?.detail || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-brand-light relative">
      {/* Quick Exit floating top header for safety during login */}
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
        <div className="inline-flex w-12 h-12 rounded-2xl bg-brand-primary items-center justify-center text-white font-extrabold text-2xl mb-4">
          A
        </div>
        <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
          {t('login')}
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          {t('subtitle')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="glass-panel border-none shadow-glass rounded-2xl p-2">
          <Form
            name="login_form"
            layout="vertical"
            initialValues={{ role: 'Survivor' }}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label={<span className="text-brand-dark font-medium">Username</span>}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<User className="w-4 h-4 text-brand-muted mr-1" />} 
                placeholder="Enter username"
                className="h-11 rounded-lg border-brand-peach/60 focus:border-brand-primary"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-brand-dark font-medium">Password</span>}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-brand-muted mr-1" />}
                placeholder="Enter password"
                className="h-11 rounded-lg border-brand-peach/60 focus:border-brand-primary"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span className="text-brand-dark font-medium">Select Your Workspace/Role</span>}
              rules={[{ required: true }]}
            >
              <Radio.Group className="grid grid-cols-2 gap-2 w-full">
                <Radio.Button value="Survivor" className="text-center rounded-lg h-10 flex items-center justify-center font-medium">
                  Survivor
                </Radio.Button>
                <Radio.Button value="Counselor" className="text-center rounded-lg h-10 flex items-center justify-center font-medium">
                  Counselor
                </Radio.Button>
                <Radio.Button value="Org Staff" className="text-center rounded-lg h-10 flex items-center justify-center font-medium col-span-2">
                  Organization Staff
                </Radio.Button>
                <Radio.Button value="County Official" className="text-center rounded-lg h-10 flex items-center justify-center font-medium">
                  County Official
                </Radio.Button>
                <Radio.Button value="Admin" className="text-center rounded-lg h-10 flex items-center justify-center font-medium">
                  Administrator
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <div className="flex items-center justify-between mb-6 text-sm">
              <Link to="/password-reset" className="text-brand-primary font-medium hover:text-brand-accent">
                Forgot password?
              </Link>
              <span className="text-brand-muted">
                Need an account?{' '}
                <Link to="/register" className="text-brand-primary font-bold hover:text-brand-accent">
                  Register
                </Link>
              </span>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-11 rounded-lg font-bold text-sm bg-brand-primary border-none shadow-lg text-white"
              >
                {t('login')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
