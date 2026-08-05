import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart2, 
  ArrowUpRight 
} from 'lucide-react';
import { StatCard } from '../../components/UI/StatCard';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { TimetableService } from '../../services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult] = useState<any>(null);

  const handleRunAI = async () => {
    setGenerating(true);
    try {
      const res = await TimetableService.generateAITimetable();
      setGenResult(res);
    } catch {
      // Handled in service mock
    } finally {
      setGenerating(false);
    }
  };

  const chartData = [
    { name: 'Computer Science', workload: 92, rooms: 88 },
    { name: 'Electronics', workload: 85, rooms: 78 },
    { name: 'Humanities', workload: 76, rooms: 95 },
    { name: 'Mechanical', workload: 80, rooms: 70 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-200 border border-indigo-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>National Education Policy (NEP) 2020 Solver Engine Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              University Academic Control Center
            </h1>
            <p className="text-xs md:text-sm text-indigo-200 mt-1 max-w-2xl">
              Multidisciplinary timetable generation engine using Google OR-Tools CP-SAT constraint satisfaction solver.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunAI}
              disabled={generating}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition transform active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{generating ? 'Running CP-SAT Solver...' : 'Generate AI Timetable'}</span>
            </button>
            <button
              onClick={() => navigate('/timetable-studio')}
              className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
            >
              <span>Timetable Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Trigger Result Alert */}
      {genResult && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                AI Timetable Generation Successful!
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Solver Engine: {genResult.aiResult?.metrics?.solverEngine || 'Google OR-Tools CP-SAT'} | Optimization Score: {genResult.aiResult?.score}% | 0 Conflicts.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/timetable-studio')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
          >
            View Grid
          </button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Departments" value="8" change="2 Multidisciplinary added" icon={Building2} color="indigo" />
        <StatCard title="Total Faculty Load" value="142 Members" change="Workload 94% balanced" icon={Users} color="emerald" />
        <StatCard title="NEP Course Baskets" value="64 Subjects" change="Major/Minor compliant" icon={BookOpen} color="cyan" />
        <StatCard title="Classroom Capacity" value="38 Rooms" change="88% Occupancy rate" icon={Calendar} color="purple" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Workload & Utilization Chart */}
        <Card title="Department Utilization & Workload" subtitle="Real-time faculty allocation vs classroom occupancy" className="lg:col-span-2">
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="workload" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Faculty Workload %" />
                <Bar dataKey="rooms" fill="#0891b2" radius={[4, 4, 0, 0]} name="Room Occupancy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* NEP 2020 Compliance Checklist */}
        <Card title="NEP 2020 Policy Status" subtitle="Multidisciplinary system validation">
          <div className="space-y-3 mt-2">
            {[
              { label: 'Major & Minor Course Slots', status: 'Compliant', type: 'success' },
              { label: 'Multidisciplinary Electives', status: 'Active (3 Baskets)', type: 'success' },
              { label: 'Academic Bank of Credits (ABC)', status: 'Integrated', type: 'success' },
              { label: 'Skill Enhancement (SEC)', status: 'Allocated', type: 'success' },
              { label: 'Lab Continuous 2-Slot Rule', status: 'Enforced', type: 'success' },
              { label: 'Faculty Daily Max Hours Cap', status: 'Protected', type: 'success' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                <Badge variant={item.type as any}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
