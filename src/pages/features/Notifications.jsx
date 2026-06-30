import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, AlertTriangle, Info, Shield, Sparkles } from 'lucide-react';
import GlassCard from '../../components/common/GlassCard';
import SkeletonCard from '../../components/common/SkeletonCard';
import { getNotifications, markNotificationRead } from '../../api/notifications';
import { useToast } from '../../context/ToastContext';
import { staggerContainer, fadeInUp } from '../../utils/animations';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Safety check-in due', detail: 'Your safety timer window ends in 10 minutes.', time: '5 min ago', type: 'alert', read: false },
  { id: 2, title: 'New resource added', detail: 'A verified shelter was added near Nairobi West.', time: '1 hour ago', type: 'info', read: false },
  { id: 3, title: 'Legal bot reply', detail: 'Your legal question has been answered by the bot.', time: 'Today, 9:14 AM', type: 'info', read: false },
  { id: 4, title: 'Organisation response', detail: 'Hope Center Nairobi has responded to your referral.', time: 'Yesterday', type: 'success', read: true },
  { id: 5, title: 'Report status update', detail: 'Report #AW-2025-0042 has moved to "In Review".', time: '2 days ago', type: 'success', read: true },
];

const typeConfig = {
  alert: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
  info: { icon: Info, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  success: { icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

function Notifications() {
  const { success } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data.results || data || MOCK_NOTIFICATIONS);
      } catch {
        setNotifications(MOCK_NOTIFICATIONS);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    success('All notifications marked as read');
  };

  const markOne = async (id) => {
    try {
      await markNotificationRead(id);
    } catch { /* ignore */ }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Notifications</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Stay updated on your reports, safety alerts, and platform news.</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300">
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </button>
          )}
        </div>
      </GlassCard>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <SkeletonCard key={i} lines={2} />)}
        </div>
      ) : notifications.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <Bell className="h-10 w-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="font-semibold text-secondary dark:text-white">No notifications yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">You're all caught up.</p>
        </GlassCard>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-3">
          {notifications.map(n => {
            const cfg = typeConfig[n.type] || typeConfig.info;
            const Icon = cfg.icon;
            return (
              <motion.div key={n.id} variants={fadeInUp}>
                <GlassCard className={`p-4 ${n.read ? 'opacity-70' : ''}`} hover={false}>
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2.5 flex-shrink-0 ${cfg.bg}`}>
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-semibold text-sm ${n.read ? 'text-slate-500 dark:text-slate-400' : 'text-secondary dark:text-white'}`}>
                          {n.title}
                          {!n.read && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary align-middle" />}
                        </p>
                        <span className="text-xs text-slate-400 flex-shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.detail}</p>
                    </div>
                    {!n.read && (
                      <button onClick={() => markOne(n.id)} className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 transition" aria-label="Mark as read">
                        <CheckCheck className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default Notifications;
