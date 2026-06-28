import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Lock, Languages, CalendarDays, Star, Building2, Users, BarChart3, KeyRound, Sparkles, Save, X } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../api/axios';

const roleConfig = {
  survivor: { title: 'Survivor profile', badge: 'Personal safety profile' },
  counselor: { title: 'Counselor profile', badge: 'Professional support profile' },
  org_staff: { title: 'Organisation Staff profile', badge: 'Team and resource profile' },
  county_official: { title: 'County official profile', badge: 'County governance profile' },
  admin: { title: 'Admin profile', badge: 'Platform administration profile' },
};

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Naivasha', 'Kitale',
  'Garissa', 'Malindi', 'Lamu', 'Machakos', 'Kiambu', 'Kajiado', 'Nyeri', 'Meru',
  'Thika', 'Kakamega', 'Bungoma', 'Busia', 'Kisii', 'Migori', 'Homa Bay', 'Siaya',
  'Kericho', 'Bomet', 'Narok', 'Kilifi', 'Kwale', 'Tana River', 'Lamu', 'Taita Taveta',
  'Makueni', 'Machakos', 'Muranga', 'Kirinyaga', 'Nyandarua', 'Laikipia', 'Nandi', 'Uasin Gishu',
  'Elgeyo Marakwet', 'West Pokot', 'Baringo', 'Samburu', 'Turkana', 'Trans Nzoia', 'Isiolo', 'Marsabit',
  'Mandera', 'Wajir', 'Garissa'
];

function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { success, error } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    county: '',
    bio: '',
    role: 'survivor',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        county: user.county || '',
        bio: user.bio || '',
        role: user.role || 'survivor',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await api.patch('/profile/', formData);
      updateUser(response.data);
      success('Profile updated successfully!');
      setIsEditing(false);
      // Force dashboard reload to show new role view
      window.location.reload();
    } catch (err) {
      console.error('Failed to update profile:', err);
      error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        county: user.county || '',
        bio: user.bio || '',
        role: user.role || 'survivor',
      });
    }
    setIsEditing(false);
  };

  const role = user?.role || 'survivor';
  const config = roleConfig[role] || roleConfig.survivor;

  return (
    <div className="space-y-6 transition-colors duration-300">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1 text-sm font-semibold text-primary dark:border-orange-400/20 dark:bg-orange-950/30">
              <Sparkles className="h-4 w-4" />
              {config.badge}
            </div>
            <h1 className="text-3xl font-black text-secondary dark:text-white">{config.title}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Manage the information and preferences that matter for your role.</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:scale-[1.02] dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-200"
            >
              Edit profile
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
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-secondary dark:text-white">Profile Information</h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <User className="h-4 w-4 text-primary" />
                Username
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                />
              ) : (
                <p className="mt-2 text-base font-semibold text-secondary dark:text-white">{user?.username || 'N/A'}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <Mail className="h-4 w-4 text-primary" />
                Email
              </div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                />
              ) : (
                <p className="mt-2 text-base font-semibold text-secondary dark:text-white">{user?.email || 'N/A'}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <Phone className="h-4 w-4 text-primary" />
                Phone
              </div>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                />
              ) : (
                <p className="mt-2 text-base font-semibold text-secondary dark:text-white">{user?.phone || 'N/A'}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-primary" />
                County
              </div>
              {isEditing ? (
                <select
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                >
                  <option value="">Select county</option>
                  {counties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              ) : (
                <p className="mt-2 text-base font-semibold text-secondary dark:text-white">{user?.county || 'N/A'}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <Shield className="h-4 w-4 text-primary" />
                Role
              </div>
              {isEditing ? (
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                >
                  <option value="survivor">Survivor</option>
                  <option value="counselor">Counselor</option>
                  <option value="org_staff">Organization Staff</option>
                  <option value="county_official">County Official</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                <p className="mt-2 text-base font-semibold text-secondary dark:text-white capitalize">{user?.role || 'survivor'}</p>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-800/70">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                <Languages className="h-4 w-4 text-primary" />
                Bio
              </div>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 text-secondary outline-none focus:border-primary dark:border-white/10 dark:bg-slate-700/50 dark:text-white"
                />
              ) : (
                <p className="mt-2 text-base font-semibold text-secondary dark:text-white">{user?.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-secondary dark:text-white">Security</h2>
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
                  <h2 className="font-semibold text-secondary dark:text-white">Privacy</h2>
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
                  <h2 className="font-semibold text-secondary dark:text-white">Account Status</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Active • Last login: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
