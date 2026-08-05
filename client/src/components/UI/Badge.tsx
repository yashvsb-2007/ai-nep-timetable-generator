import React from 'react';
import { CourseType } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'nep';
  courseType?: CourseType;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', courseType, className = '' }) => {
  let styleClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

  if (courseType) {
    switch (courseType) {
      case 'MAJOR':
        styleClasses = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800';
        break;
      case 'MINOR':
        styleClasses = 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800';
        break;
      case 'MULTIDISCIPLINARY':
        styleClasses = 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800';
        break;
      case 'SEC':
        styleClasses = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
        break;
      case 'AEC':
        styleClasses = 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800';
        break;
      case 'VAC':
        styleClasses = 'bg-pink-100 text-pink-800 dark:bg-pink-950/80 dark:text-pink-300 border border-pink-200 dark:border-pink-800';
        break;
      default:
        styleClasses = 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
    }
  } else {
    switch (variant) {
      case 'success':
        styleClasses = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
        break;
      case 'warning':
        styleClasses = 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
        break;
      case 'danger':
        styleClasses = 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
        break;
      case 'info':
        styleClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
        break;
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${styleClasses} ${className}`}>
      {children}
    </span>
  );
};
