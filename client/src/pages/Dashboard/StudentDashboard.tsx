import React from 'react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { StatCard } from '../../components/UI/StatCard';
import { GraduationCap, Award, BookOpen, Download, Shield, CheckCircle2 } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const studentData = {
    name: 'Rohan Verma',
    rollNumber: '2026-CSE-001',
    program: 'B.Tech Computer Science & Engineering (NEP Multidisciplinary Structure)',
    semester: 1,
    section: 'CSE 1-A',
    abcId: 'ABC-2026-9874-1122',
    totalCredits: 20
  };

  const registeredCourses = [
    { code: 'CS101', name: 'Data Structures & Algorithms', type: 'MAJOR', credits: 4, faculty: 'Dr. Priya Sundaram' },
    { code: 'CS101L', name: 'Data Structures Lab', type: 'MAJOR', credits: 2, faculty: 'Dr. Priya Sundaram' },
    { code: 'DS101', name: 'Introduction to Data Science & Analytics', type: 'MINOR', credits: 3, faculty: 'Dr. Sunita Rao' },
    { code: 'NEP201', name: 'Ethics in AI & Multidisciplinary Studies', type: 'MULTIDISCIPLINARY', credits: 3, faculty: 'Prof. Rajesh Kumar' },
    { code: 'SEC101', name: 'Python Programming for Automation', type: 'SEC', credits: 2, faculty: 'Dr. Priya Sundaram' },
    { code: 'AEC101', name: 'Advanced Professional Communication', type: 'AEC', credits: 2, faculty: 'Prof. S. Gupta' },
    { code: 'VAC101', name: 'Holistic Wellness & Yoga', type: 'VAC', credits: 2, faculty: 'Dr. M. Sharma' }
  ];

  return (
    <div className="space-y-6">
      {/* Student Identity Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>{studentData.program}</span>
          </div>
          <h1 className="text-2xl font-extrabold">{studentData.name}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Roll No: <strong className="text-slate-200">{studentData.rollNumber}</strong> | Section: <strong className="text-slate-200">{studentData.section}</strong> | Semester {studentData.semester}
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 flex items-center space-x-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Academic Bank of Credits (ABC)</span>
            </div>
            <div className="text-sm font-extrabold text-white mt-0.5">{studentData.abcId}</div>
            <div className="text-[10px] text-slate-400">Total Enrolled Credits: <strong className="text-indigo-300">{studentData.totalCredits} Credits</strong></div>
          </div>
          <button
            onClick={() => window.print()}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition no-print"
          >
            <Download className="w-4 h-4" />
            <span>Export Timetable</span>
          </button>
        </div>
      </div>

      {/* Credit Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Major Credits" value="6 Credits" change="Core Engineering" icon={BookOpen} color="indigo" />
        <StatCard title="Minor Credits" value="3 Credits" change="Data Science Stream" icon={BookOpen} color="cyan" />
        <StatCard title="Multidisciplinary" value="3 Credits" change="Ethics in AI" icon={BookOpen} color="purple" />
        <StatCard title="SEC / AEC / VAC" value="6 Credits" change="Skill & Value Added" icon={Award} color="emerald" />
      </div>

      {/* Enrolled Courses Basket */}
      <Card title="NEP 2020 Registered Multidisciplinary Courses" subtitle="Semester 1 Course Allocations & Faculty">
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Course Code</th>
                <th className="p-3">Course Title</th>
                <th className="p-3">NEP Stream Type</th>
                <th className="p-3">Credits</th>
                <th className="p-3 rounded-r-lg">Instructor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {registeredCourses.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{c.code}</td>
                  <td className="p-3 font-medium text-slate-900 dark:text-slate-100">{c.name}</td>
                  <td className="p-3"><Badge courseType={c.type as any}>{c.type}</Badge></td>
                  <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{c.credits} Credits</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{c.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
