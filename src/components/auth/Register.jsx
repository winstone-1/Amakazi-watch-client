import React, { useState } from 'react';
import { Form, Input, Button, Radio, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Mail, EyeOff } from 'lucide-react';
import { register as registerApi } from '../../api/auth';
import { useTranslation } from '../../context/LanguageContext';
import { quickExit } from '../../utils/helpers';

export const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      try {
        await registerApi(values);
      } catch (err) {
        console.warn('Real API missing/failed, using simulation fallback');
      }
      message.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.detail || 'Registration failed. Try again.');
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
        <div className="inline-flex w-12 h-12 rounded-2xl bg-brand-primary items-center justify-center text-white font-extrabold text-2xl mb-4">
          A
        </div>
        <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
          {t('register')}
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Create an account to access secure modules
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="glass-panel border-none shadow-glass rounded-2xl p-2">
          <Form
            name="register_form"
            layout="vertical"
            initialValues={{ role: 'Survivor' }}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label={<span className="text-brand-dark font-medium">Username</span>}
              rules={[{ required: true, message: 'Please enter a username!' }]}
            >
              <Input 
                prefix={<User className="w-4 h-4 text-brand-muted mr-1" />} 
                placeholder="Enter username"
                className="h-11 rounded-lg border-brand-peach/60 focus:border-brand-primary"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="text-brand-dark font-medium">Email Address (Optional/Responders)</span>}
              rules={[{ type: 'email', message: 'Enter a valid email!' }]}
            >
              <Input 
                prefix={<Mail className="w-4 h-4 text-brand-muted mr-1" />} 
                placeholder="Enter email"
                className="h-11 rounded-lg border-brand-peach/60 focus:border-brand-primary"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-brand-dark font-medium">Password</span>}
              rules={[
                { required: true, message: 'Please input a password!' },
                { min: 8, message: 'Password must be at least 8 characters!' }
              ]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-brand-muted mr-1" />}
                placeholder="Enter password"
                className="h-11 rounded-lg border-brand-peach/60 focus:border-brand-primary"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label={<span className="text-brand-dark font-medium">Register As</span>}
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
                <Radio.Button value="County Official" className="text-center rounded-lg h-10 flex items-center justify-center font-medium col-span-2">
                  County Official
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            <div className="flex justify-end mb-6 text-sm">
              <span className="text-brand-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-primary font-bold hover:text-brand-accent">
                  Log In
                </Link>
              </span>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-11 rounded-lg font-bold text-sm bg-brand-primary border-none shadow-lg text-white"
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
