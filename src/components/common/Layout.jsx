import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layout as AntLayout, Menu, Button, Avatar, Badge, Space 
} from 'antd';
import { 
  LayoutDashboard, FileText, Shield, FileCheck, Users, 
  MessageSquare, BookOpen, Settings, LogOut, HeartHandshake,
  User, Award, EyeOff
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../context/LanguageContext';
import { quickExit } from '../../utils/helpers';
import LanguageSwitcher from './LanguageSwitcher';

const { Header, Sider, Content } = AntLayout;

export const Layout = ({ children }) => {
  const { user, role, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define sidebar menu items based on roles
  const menuItems = [
    {
      key: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: <Link to="/dashboard">{t('dashboard')}</Link>,
      roles: ['Survivor', 'Counselor', 'Org Staff', 'County Official', 'Admin']
    },
    {
      key: '/reports',
      icon: <FileText className="w-5 h-5" />,
      label: <Link to="/reports">{t('reports')}</Link>,
      roles: ['Survivor', 'Admin']
    },
    {
      key: '/safety',
      icon: <Shield className="w-5 h-5" />,
      label: <Link to="/safety">{t('safety')}</Link>,
      roles: ['Survivor', 'Admin']
    },
    {
      key: '/vault',
      icon: <FileCheck className="w-5 h-5" />,
      label: <Link to="/vault">{t('vault')}</Link>,
      roles: ['Survivor', 'Admin']
    },
    {
      key: '/peer-support',
      icon: <HeartHandshake className="w-5 h-5" />,
      label: <Link to="/peer-support">{t('peerSupport')}</Link>,
      roles: ['Survivor', 'Counselor', 'Admin']
    },
    {
      key: '/legal-bot',
      icon: <MessageSquare className="w-5 h-5" />,
      label: <Link to="/legal-bot">{t('legalBot')}</Link>,
      roles: ['Survivor', 'Admin']
    },
    {
      key: '/organisations',
      icon: <Users className="w-5 h-5" />,
      label: <Link to="/organisations">{t('organisations')}</Link>,
      roles: ['Survivor', 'Org Staff', 'Admin']
    },
    {
      key: '/education',
      icon: <BookOpen className="w-5 h-5" />,
      label: <Link to="/education">{t('browseResources')}</Link>,
      roles: ['Survivor', 'Counselor', 'Org Staff', 'County Official', 'Admin']
    },
    {
      key: '/scorecards',
      icon: <Award className="w-5 h-5" />,
      label: <Link to="/scorecards">{t('scorecards')}</Link>,
      roles: ['County Official', 'Admin']
    },
    {
      key: '/admin',
      icon: <Settings className="w-5 h-5" />,
      label: <Link to="/admin">{t('admin')}</Link>,
      roles: ['Admin']
    }
  ];

  // Filter items matching user's current role
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <AntLayout className="min-h-screen bg-brand-light">
      {/* Sidebar Sider */}
      <Sider
        width={250}
        theme="light"
        className="border-r border-brand-peach/40 shadow-sm hidden md:block"
        style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(16px)' }}
      >
        <div className="p-5 flex flex-col justify-between h-full">
          <div>
            {/* App Logo/Header */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-extrabold text-lg">
                A
              </div>
              <span className="font-extrabold text-xl tracking-tight text-brand-dark">
                {t('title')}
              </span>
            </div>

            {/* User Profile Card */}
            {user && (
              <div className="mb-6 p-3 rounded-xl bg-white/60 border border-white/80 flex items-center gap-3">
                <Avatar icon={<User className="w-4 h-4 text-brand-primary" />} className="bg-brand-peach" />
                <div className="overflow-hidden">
                  <p className="text-xs text-brand-muted">{t('home') === 'Home' ? 'Welcome back' : 'Karibu tena'}</p>
                  <p className="font-semibold text-brand-dark text-sm truncate">{user.username}</p>
                  <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-medium bg-brand-primary/10 text-brand-primary rounded-md">
                    {role}
                  </span>
                </div>
              </div>
            )}

            {/* Sidebar Sider Navigation menu */}
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={filteredMenuItems}
              className="border-none bg-transparent"
              style={{ background: 'transparent' }}
            />
          </div>

          <div>
            {/* Quick Exit Shortcut */}
            <Button
              type="primary"
              danger
              onClick={quickExit}
              icon={<EyeOff className="w-4 h-4" />}
              className="w-full flex items-center justify-center gap-2 mb-4 font-bold h-10 rounded-lg shadow-md"
            >
              {t('quickExit')}
            </Button>

            {/* Logout button */}
            <Button
              type="text"
              onClick={handleLogout}
              icon={<LogOut className="w-4 h-4 text-brand-muted" />}
              className="w-full flex items-center justify-center gap-2 text-brand-muted hover:text-brand-primary"
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </Sider>

      {/* Main Layout Section */}
      <AntLayout className="bg-transparent">
        {/* Top Header */}
        <Header className="bg-white/40 backdrop-blur-md border-b border-brand-peach/30 px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <span className="md:hidden font-extrabold text-lg tracking-tight text-brand-dark">
              {t('title')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Quick Exit Header Button */}
            <Button
              type="primary"
              danger
              size="small"
              onClick={quickExit}
              className="md:hidden font-bold"
            >
              {t('quickExit')}
            </Button>
          </div>
        </Header>

        {/* Content Area */}
        <Content className="p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
