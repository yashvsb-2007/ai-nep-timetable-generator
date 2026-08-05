import React from 'react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { Download, BarChart3, PieChart, CheckCircle2, Shield } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart as RePieChart, Pie, Cell } from 'recharts';

export const ReportsModule: React.FC = () => {
  const workloadData = [
    { name: 'Dr. Priya Sundaram', hours: 14, limit: 16 },
    { name: 'Prof. Rajesh Kumar', hours: 18, limit: 18 },
    { name: 'Dr. Sunita Rao', hours: 12, limit: 16 },
    { name: 'Dr. V. Patel', hours: 10, limit: 16 }
  ];

  const nepStreamData = [
    { name: 'MAJOR Core', value: 45, color: '#4f46e5' },
    { name: 'MINOR Stream', value: 20, color: '#0891b2' },
    { name: 'MULTIDISCIPLINARY', value: 15, color: '#8b5cf6' },
    { name: 'SEC Skills', value: 10, color: '#059669' },
    { name: 'AEC / VAC', value: 10, color: '#d97706' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            System Analytical Reports & Audits
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comprehensive workload, room occupancy, NEP credit distribution, and AI conflict reports.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md transition self-start no-print"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Audit PDF</span>
        </button>
      </div>

      {/* Summary Stat Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center space-x-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Zero Schedule Conflicts</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300">All hard constraints satisfied by CP-SAT solver.</div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 p-4 rounded-xl flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Classroom Occupancy: 86.4%</div>
            <div className="text-[11px] text-indigo-700 dark:text-indigo-300">Optimal utilization without room double-booking.</div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 p-4 rounded-xl flex items-center space-x-3">
          <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold text-purple-900 dark:text-purple-200">NEP 2020 Compliance: 100%</div>
            <div className="text-[11px] text-purple-700 dark:text-purple-300">Major, Minor, SEC, and ABC validation passed.</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Faculty Workload Allocation (Hours/Wk)" subtitle="Actual assigned hours vs maximum weekly cap">
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Assigned Hours" />
                <Bar dataKey="limit" fill="#c7d2fe" radius={[4, 4, 0, 0]} name="Max Allowed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="NEP Course Stream Distribution" subtitle="Percentage breakdown of subject offerings">
          <div className="h-64 mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={nepStreamData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {nepStreamData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
