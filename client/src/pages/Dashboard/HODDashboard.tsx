import React from 'react';
import { Card } from '../../components/UI/Card';
import { StatCard } from '../../components/UI/StatCard';
import { Badge } from '../../components/UI/Badge';
import { Users, BookOpen, Calendar, AlertCircle } from 'lucide-react';

export const HODDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Department Dashboard (Computer Science & Engineering)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage department course offerings, faculty teaching allocations, and multidisciplinary basket scheduling.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Department Faculty" value="18 Faculty" change="All hours allocated" icon={Users} color="indigo" />
        <StatCard title="Courses Handled" value="24 Subjects" change="Major + Minor + SEC" icon={BookOpen} color="cyan" />
        <StatCard title="Scheduled Slots" value="112 Sessions/Wk" change="0 Conflicts" icon={Calendar} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Faculty Teaching Workload" subtitle="Department faculty weekly hours distribution">
          <div className="space-y-3 mt-2">
            {[
              { name: 'Dr. Priya Sundaram', role: 'Assoc. Prof', hours: '14 / 16 hrs', status: 'OPTIMAL', type: 'success' },
              { name: 'Prof. Rajesh Kumar', role: 'HOD & Prof', hours: '18 / 18 hrs', status: 'MAXIMUM', type: 'warning' },
              { name: 'Dr. Sunita Rao', role: 'Asst. Prof', hours: '12 / 16 hrs', status: 'OPTIMAL', type: 'success' },
              { name: 'Dr. V. Patel', role: 'Asst. Prof', hours: '10 / 16 hrs', status: 'AVAILABLE', type: 'info' }
            ].map((fac, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{fac.name}</div>
                  <div className="text-[10px] text-slate-400">{fac.role}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{fac.hours}</span>
                  <Badge variant={fac.type as any}>{fac.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="NEP Multidisciplinary Elective Slots" subtitle="Cross-department enrollment status">
          <div className="space-y-3 mt-2">
            {[
              { code: 'NEP201', name: 'Ethics in AI & Multidisciplinary Studies', type: 'MULTIDISCIPLINARY', enrolled: '45 Students' },
              { code: 'DS101', name: 'Introduction to Data Science & Analytics', type: 'MINOR', enrolled: '38 Students' },
              { code: 'SEC101', name: 'Python Programming for Automation', type: 'SEC', enrolled: '52 Students' }
            ].map((course, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Badge courseType={course.type as any}>{course.code}</Badge>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{course.name}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{course.enrolled}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
