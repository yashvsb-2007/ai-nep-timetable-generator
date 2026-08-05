import React from 'react';
import { Sun, Moon, Bell, User as UserIcon, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { user, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between no-print">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
          <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">NEP 2020 Framework Aligned</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Role Switcher for instant simulation */}
        <div className="relative group">
          <button className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 transition">
            <span>Role: <strong className="text-indigo-600 dark:text-indigo-400">{user?.role}</strong></span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch View Persona</div>
            {(['COLLEGE_ADMIN', 'DEPT_ADMIN', 'HOD', 'FACULTY', 'STUDENT'] as UserRole[]).map(r => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/50 ${user?.role === r ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700 dark:text-slate-300'}`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user?.name}</div>
            <div className="text-[10px] text-slate-400">{user?.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
