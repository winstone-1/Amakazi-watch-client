import React from "react";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, MapPin, Shield, Lock,
  Languages, CalendarDays, Sparkles, Save, X, Edit2,
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import AvatarUpload from '../components/common/AvatarUpload';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api/axios';

const roleConfig = {
  survivor:       { title: 'Survivor Profile',        badge: 'Personal safety profile',      color: 'from-primary to-orange-400' },
  counselor:      { title: 'Counselor Profile',        badge: 'Professional support profile', color: 'from-sky-500 to-blue-400' },
  org_staff:      { title: 'Organisation Staff',       badge: 'Team and resource profile',    color: 'from-violet-500 to-purple-400' },
  county_official:{ title: 'County Official Profile',  badge: 'County governance profile',    color: 'from-emerald-500 to-teal-400' },
  admin:          { title: 'Admin Profile',            badge: 'Platform administration',      color: 'from-slate-600 to-slate-500' },
};

const COUNTIES = [
  'Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Naivasha','Kitale','Garissa','Malindi',
  'Lamu','Machakos','Kiambu','Kajiado','Nyeri','Meru','Thika','Kakamega','Bungoma',
  'Busia','Kisii','Migori','Homa Bay','Siaya','Kericho','Bomet','Narok','Kilifi','Kwale',
  'Tana River','Taita Taveta','Makueni','Muranga','Kirinyaga','Nyandarua','Laikipia',
  'Nandi','Uasin Gishu','Elgeyo Marakwet','West Pokot','Baringo','Samburu','Turkana',
  'Trans Nzoia','Isiolo','Marsabit','Mandera','Wajir',
];

function FieldRow({ icon: Icon, label, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      {children}
    </div>
  );
}

function Profile() {
  const { user, updateUser } = useAuth();
  const { success, error } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '', email: '', phone: '', county: '', bio: '', role: 'survivor',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email:    user.email    || '',
        phone:    user.phone    || '',
        county:   user.county   || '',
        bio:      user.bio      || '',
        role:     user.role     || 'survivor',
      });
    }
  }, [user]);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAvatarUpload = async (secureUrl) => {
    try {
      await api.patch('/profile/', { avatar: secureUrl });
      updateUser({ avatar: secureUrl });
      success('Profile picture updated!');
    } catch {
      // Avatar URL already shown in UI via local preview — non-critical
      updateUser({ avatar: secureUrl });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await api.patch('/profile/', formData);
      updateUser(res.data);
      success('Profile updated successfully!');
      setIsEditing(false);
      // Reload to ensure dashboard RBAC re-renders with new role
      if (res.data.role !== user?.role) {
        setTimeout(() => window.location.reload(), 400);
      }
    } catch (err) {
      error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || '',
        email:    user.email    || '',
        phone:    user.phone    || '',
        county:   user.county   || '',
        bio:      user.bio      || '',
        role:     user.role     || 'survivor',
      });
    }
    setIsEditing(false);
  };

  const role   = user?.role || 'survivor';
  const config = roleConfig[role] || roleConfig.survivor;

  const inputCls =
    'w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary text-sm outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white';

  return (
    <div className="space-y-0 transition-colors duration-300">

      {/* ── Cover + Avatar ─────────────────────────────────────────── */}
      <div className="relative rounded-t-3xl overflow-hidden">
        {/* Cover gradient */}
        <div className={`h-36 sm:h-44 bg-gradient-to-r ${config.color}`}>
          {/* Edit cover placeholder */}
          {isEditing && (
            <button
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/50 transition"
              onClick={() => {}} // cover upload hook-up point
              title="Change cover (coming soon)"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit Cover
            </button>
          )}
        </div>

        {/* Avatar — positioned over the cover bottom edge */}
        <div className="absolute left-6 sm:left-8 -bottom-12">
          <AvatarUpload
            currentAvatar={user?.avatar}
            username={user?.username || 'U'}
            onUpload={handleAvatarUpload}
            size="lg"
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* ── Profile header card ─────────────────────────────────────── */}
      <GlassCard className="rounded-t-none pt-16 pb-6 px-6 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-xs font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              {config.badge}
            </div>
            <h1 className="text-2xl font-black text-secondary dark:text-white">{config.title}</h1>
            {/* Role + county tags */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-semibold text-primary capitalize">
                {user?.role || 'survivor'}
              </span>
              {user?.county && (
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-0.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {user.county}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {user?.bio || 'No bio yet'}
            </p>
          </div>

          {/* Action buttons */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:scale-[1.02] dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:scale-[1.02] dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
              >
                <X className="h-4 w-4 inline mr-1" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-50"
              >
                <Save className="h-4 w-4 inline mr-1" />
                {loading ? 'Saving…' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* ── Form + sidebar ──────────────────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] mt-6">

        {/* Left — editable fields */}
        <GlassCard className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-secondary dark:text-white">Profile Information</h2>
          <div className="space-y-4">

            <FieldRow icon={User} label="Username">
              {isEditing
                ? <input type="text" name="username" value={formData.username} onChange={handleChange} className={inputCls} />
                : <p className="text-base font-semibold text-secondary dark:text-white">{user?.username || 'N/A'}</p>
              }
            </FieldRow>

            <FieldRow icon={Mail} label="Email">
              {isEditing
                ? <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputCls} />
                : <p className="text-base font-semibold text-secondary dark:text-white">{user?.email || 'N/A'}</p>
              }
            </FieldRow>

            <FieldRow icon={Phone} label="Phone">
              {isEditing
                ? <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="07XX XXX XXX" className={inputCls} />
                : <p className="text-base font-semibold text-secondary dark:text-white">{user?.phone || 'N/A'}</p>
              }
            </FieldRow>

            <FieldRow icon={MapPin} label="County">
              {isEditing
                ? (
                  <select name="county" value={formData.county} onChange={handleChange} className={inputCls}>
                    <option value="">Select county</option>
                    {COUNTIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                )
                : <p className="text-base font-semibold text-secondary dark:text-white">{user?.county || 'N/A'}</p>
              }
            </FieldRow>

            <FieldRow icon={Shield} label="Role">
              {isEditing
                ? (
                  <select name="role" value={formData.role} onChange={handleChange} className={inputCls}>
                    <option value="survivor">Survivor</option>
                    <option value="counselor">Counselor</option>
                    <option value="org_staff">Organization Staff</option>
                    <option value="county_official">County Official</option>
                    <option value="admin">Admin</option>
                  </select>
                )
                : <p className="text-base font-semibold text-secondary dark:text-white capitalize">{user?.role || 'survivor'}</p>
              }
            </FieldRow>

            <FieldRow icon={Languages} label="Bio">
              {isEditing
                ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us a little about yourself…"
                    className={inputCls + ' resize-none'}
                  />
                )
                : <p className="text-base text-secondary dark:text-white">{user?.bio || 'No bio provided'}</p>
              }
            </FieldRow>

          </div>
        </GlassCard>

        {/* Right — status cards */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary dark:text-white">Security</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Your account is protected with secure authentication.</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <GlassCard className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary dark:text-white">Privacy</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Your data is encrypted and only accessible by you.</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-500/10 p-2 text-sky-600 dark:text-sky-400">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary dark:text-white">Account Status</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Active · Member since {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Avatar hint when not editing */}
          {!isEditing && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <GlassCard className="p-5 border-orange-200/70 bg-orange-50/80 dark:border-orange-400/20 dark:bg-orange-950/20">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Click <strong>"Edit Profile"</strong> to update your name, role, county, and profile picture.
                  Role changes take effect immediately after saving.
                </p>
              </GlassCard>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;
