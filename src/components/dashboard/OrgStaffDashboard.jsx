import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, FileText, AlertTriangle, Sparkles, Bed, Scale, CalendarDays } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getOrgInventory, getCaseMatches } from '../../api/org';
import { useToast } from '../../context/ToastContext';

function OrgStaffDashboard() {
  const { success, error } = useToast();
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState({ beds: 0, legal_slots: 0, counselors: 0 });
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [inventoryData, referralsData] = await Promise.all([
        getOrgInventory(),
        getCaseMatches()
      ]);
      setInventory(inventoryData || { beds: 0, legal_slots: 0, counselors: 0 });
      setReferrals(referralsData.results || referralsData || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              Organisation Dashboard
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">Resource Management</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Track your organization's resources, manage referrals, and monitor community impact.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Bed className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Available Beds</p>
            </div>
            <p className="mt-2 text-3xl font-black text-primary">{inventory.beds}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Shelter capacity</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Legal Slots</p>
            </div>
            <p className="mt-2 text-3xl font-black text-accent">{inventory.legal_slots}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Legal aid available</p>
          </GlassCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Counselors</p>
            </div>
            <p className="mt-2 text-3xl font-black text-emerald-600 dark:text-emerald-400">{inventory.counselors}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">On shift today</p>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Case Matching</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Review and assign incoming referrals</p>
            </div>
            <Link to="/org/case-matching" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {referrals.slice(0, 3).map((referral) => (
              <div key={referral.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-3 dark:border-white/10 dark:bg-slate-800/60">
                <div className="mt-1 rounded-full bg-accent/10 p-2 text-accent">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-secondary dark:text-white">Case #{referral.id}</p>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                      Pending
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{referral.county || 'Nairobi County'}</p>
                </div>
              </div>
            ))}
            {referrals.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending referrals</p>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">Resource Inventory</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Current resource status</p>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Emergency Food Supplies', status: 'Well Stocked', color: 'text-emerald-600' },
              { name: 'Medical Kits', status: 'Low Stock', color: 'text-amber-600' },
              { name: 'Hygiene Products', status: 'Well Stocked', color: 'text-emerald-600' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-slate-800/50">
                <p className="text-sm font-medium text-secondary dark:text-white">{item.name}</p>
                <span className={`text-sm font-semibold ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">Volunteer Schedule</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">This week's volunteer shifts</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { day: 'Mon', volunteers: 6 },
            { day: 'Tue', volunteers: 8 },
            { day: 'Wed', volunteers: 5 },
            { day: 'Thu', volunteers: 7 },
          ].map((day) => (
            <div key={day.day} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 text-center dark:border-white/10 dark:bg-slate-800/50">
              <p className="font-semibold text-secondary dark:text-white">{day.day}</p>
              <p className="mt-2 text-2xl font-black text-primary">{day.volunteers}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">volunteers</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default OrgStaffDashboard;
