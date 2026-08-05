import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Layers, 
  Building2, 
  BarChart3, 
  Settings, 
  GraduationCap, 
  BookOpen, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const getDashboardPath = () => {
    switch (user?.role) {
      case 'COLLEGE_ADMIN': return '/dashboard/admin';
      case 'DEPT_ADMIN':
      case 'HOD': return '/dashboard/hod';
      case 'FACULTY': return '/dashboard/faculty';
      case 'STUDENT': return '/dashboard/student';
      default: return '/dashboard/admin';
    }
  };

  const navItems = [
    { label: 'Dashboard', path: getDashboardPath(), icon: LayoutDashboard },
    { label: 'Timetable Studio', path: '/timetable-studio', icon: Calendar },
    { label: 'NEP Credit Basket', path: '/nep-basket', icon: Layers },
    { label: 'Master Management', path: '/master-management', icon: Building2, roles: ['COLLEGE_ADMIN', 'DEPT_ADMIN', 'HOD'] },
    { label: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
    { label: 'System Settings', path: '/settings', icon: Settings, roles: ['COLLEGE_ADMIN'] }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 no-print flex-shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-white text-base tracking-tight leading-tight">NEP Timetable</h1>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">AI Engine ERP v1.0</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Main Navigation</div>
        {navItems
          .filter(item => !item.roles || item.roles.includes(user?.role || ''))
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 font-semibold'
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
      </nav>

      {/* System Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 mb-3">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300 font-semibold mb-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>NEP 2020 Compliance</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            CP-SAT Constraint Solver engine active for Multidisciplinary Major/Minor credit allocations.
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900/50 border border-slate-700 text-slate-400 text-xs font-semibold transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
