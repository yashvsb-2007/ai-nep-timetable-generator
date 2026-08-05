import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { Settings, Shield, Database, FileText, CheckCircle2, Save } from 'lucide-react';

export const SystemSettings: React.FC = () => {
  const [maxHours, setMaxHours] = useState('18');
  const [solverTimeout, setSolverTimeout] = useState('10');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const auditLogs = [
    { id: 'log_1', user: 'Dr. A. K. Sharma (Admin)', action: 'Triggered AI CP-SAT Timetable Generation', time: '10 mins ago', ip: '192.168.1.42' },
    { id: 'log_2', user: 'Prof. Rajesh Kumar (HOD)', action: 'Updated Department Course Basket (NEP201)', time: '1 hour ago', ip: '192.168.1.18' },
    { id: 'log_3', user: 'Dr. Priya Sundaram (Faculty)', action: 'Submitted Availability Preference Request', time: '3 hours ago', ip: '192.168.1.55' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          System Configuration & Governance
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage AI engine constraints, academic parameters, backup archives, and audit trails.
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3 rounded-xl text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>System configuration parameters updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solver Configuration */}
        <Card title="AI Solver Parameters" subtitle="Google OR-Tools CP-SAT execution constraints">
          <form onSubmit={handleSave} className="space-y-4 mt-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Faculty Weekly Lecture Hour Cap
              </label>
              <input
                type="number"
                value={maxHours}
                onChange={e => setMaxHours(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Solver Timeout Limit (Seconds)
              </label>
              <input
                type="number"
                value={solverTimeout}
                onChange={e => setSolverTimeout(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
            >
              <Save className="w-4 h-4" />
              <span>Save AI Engine Settings</span>
            </button>
          </form>
        </Card>

        {/* Audit Logs */}
        <Card title="System Audit Logs" subtitle="Security and operational transaction history">
          <div className="space-y-3 mt-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                  <span>{log.user}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{log.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{log.action}</p>
                <div className="text-[10px] text-slate-400 font-mono mt-1">IP: {log.ip}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
