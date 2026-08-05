import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/api';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('COLLEGE_ADMIN');
  const [email, setEmail] = useState('admin@university.edu');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleDefaults: Record<UserRole, { email: string; label: string }> = {
    COLLEGE_ADMIN: { email: 'admin@university.edu', label: 'College Admin' },
    DEPT_ADMIN: { email: 'dept.admin@university.edu', label: 'Department Admin' },
    HOD: { email: 'hod.cse@university.edu', label: 'Head of Department (HOD)' },
    FACULTY: { email: 'faculty.cse@university.edu', label: 'Faculty Member' },
    STUDENT: { email: 'student@university.edu', label: 'Student' }
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setEmail(roleDefaults[selectedRole].email);
    setPassword('password123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await AuthService.login(email, password, role);
      if (res.success) {
        login(res.user, res.token);
        // Redirect to role dashboard
        switch (role) {
          case 'COLLEGE_ADMIN': navigate('/dashboard/admin'); break;
          case 'DEPT_ADMIN':
          case 'HOD': navigate('/dashboard/hod'); break;
          case 'FACULTY': navigate('/dashboard/faculty'); break;
          case 'STUDENT': navigate('/dashboard/student'); break;
          default: navigate('/dashboard/admin');
        }
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError('Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-4">
          <GraduationCap className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          AI Timetable ERP Platform
        </h2>
        <p className="mt-1 text-xs text-indigo-300 font-medium flex items-center justify-center space-x-1">
          <Shield className="w-3.5 h-3.5" />
          <span>Aligned with National Education Policy (NEP) 2020</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          {/* Role selector tab */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Login Role</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(Object.keys(roleDefaults) as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                    role === r
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {roleDefaults[r].label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-rose-950/60 border border-rose-800 text-rose-300 px-4 py-2.5 rounded-xl text-xs">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center text-slate-400">
                <input type="checkbox" defaultChecked className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0 mr-2" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-indigo-400 hover:text-indigo-300 font-medium">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 focus:outline-none transition disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as {roleDefaults[role].label}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts Banner */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-400 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Instant Demo Credentials Pre-filled</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Click any role button above to automatically populate valid demo login parameters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
