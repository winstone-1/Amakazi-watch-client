import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, FileText, AlertTriangle, Sparkles, Bed, Scale, CalendarDays } from 'lucide-react';
import AnimatedCard from '../common/AnimatedCard';
import { getOrgInventory, getCaseMatches } from '../../api/org';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

function OrgStaffDashboard() {
  const { user } = useAuth();
  const { error } = useToast();
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
      <AnimatedCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary/30 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black">{user?.username?.[0]?.toUpperCase() || 'P'}</span>
              )}
            </div>
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-xs font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
                <Sparkles className="h-3 w-3" />
                Organisation Dashboard
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-secondary dark:text-white">Welcome, {user?.username || 'Partner'}. Your impact matters.</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Track your organization's resources, manage referrals, and monitor community impact.
              </p>
            </div>
          </div>
        </div>
      </AnimatedCard>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Bed className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Available Beds</p>
            </div>
            <p className="mt-2 text-3xl font-black text-primary">{inventory.beds || 14}</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">65% of capacity used</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <AnimatedCard className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Legal Slots</p>
            </div>
            <p className="mt-2 text-3xl font-black text-accent">{inventory.legal_slots || 3}</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-full bg-accent rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">85% of slots booked</p>
          </AnimatedCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <AnimatedCard className="p-5 relative overflow-hidden">
            <div className="absolute top-5 right-5 h-3 w-3 rounded-full bg-red-500 animate-ping" />
            <div className="absolute top-5 right-5 h-3 w-3 rounded-full bg-red-500" />
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Referrals</p>
            </div>
            <p className="mt-2 text-3xl font-black text-red-600 dark:text-red-400 animate-pulse">{referrals.length || 7}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Awaiting your response</p>
          </AnimatedCard>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AnimatedCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-secondary dark:text-white">Case Matching Suggestions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">High-priority referrals matching your capacity</p>
            </div>
            <Link to="/org/case-matching" className="text-sm font-semibold text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { id: '1849', need: 'Emergency Shelter (Female + 2 children)', score: 98, urgency: 'High' },
              { id: '1852', need: 'Legal Consultation (Custody)', score: 85, urgency: 'Medium' },
            ].map((referral) => (
              <div key={referral.id} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-800/60 transition hover:shadow-md">
                <div className="mt-1 flex flex-col items-center justify-center h-12 w-12 rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30">
                  <span className="text-sm font-bold">{referral.score}%</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-secondary dark:text-white">Case #{referral.id}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      referral.urgency === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300'
                    }`}>
                      {referral.urgency}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 font-medium">{referral.need}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 rounded-full bg-primary py-1.5 text-xs font-bold text-white transition hover:bg-primary/90">Accept Case</button>
                    <button className="flex-1 rounded-full border border-slate-200 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Decline</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-white">Resource Inventory</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Current resource status</p>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Emergency Food Supplies', status: 'Well Stocked', color: 'bg-emerald-500', width: '85%' },
              { name: 'Medical Kits', status: 'Low Stock', color: 'bg-amber-500', width: '25%' },
              { name: 'Hygiene Products', status: 'Adequate', color: 'bg-primary', width: '50%' },
              { name: 'Counselors on duty', status: 'Optimal', color: 'bg-emerald-500', width: '90%' },
            ].map((item) => (
              <div key={item.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-secondary dark:text-white">{item.name}</p>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.status}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      <AnimatedCard className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">Volunteer Hours</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">This week's volunteer contributions</p>
          </div>
        </div>
        <div className="flex items-end gap-2 h-32 mt-6">
          {[
            { day: 'Mon', hours: 45 },
            { day: 'Tue', hours: 62 },
            { day: 'Wed', hours: 38 },
            { day: 'Thu', hours: 55 },
            { day: 'Fri', hours: 80 },
            { day: 'Sat', hours: 95 },
            { day: 'Sun', hours: 70 },
          ].map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">{day.hours}h</span>
              <div className="w-full bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-pointer" style={{ height: `${(day.hours / 100) * 100}%` }}></div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{day.day}</span>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}

export default OrgStaffDashboard;
