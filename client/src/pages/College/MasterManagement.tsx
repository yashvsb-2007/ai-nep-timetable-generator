import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { Building2, Plus, Users, School, Clock, CheckCircle2 } from 'lucide-react';

export const MasterManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DEPARTMENTS' | 'CLASSROOMS' | 'FACULTY' | 'SLOTS'>('DEPARTMENTS');

  const [departments, setDepartments] = useState([
    { id: 'dept_cse', code: 'CSE', name: 'Computer Science & Engineering', hod: 'Prof. Rajesh Kumar', building: 'Tech Block' },
    { id: 'dept_ece', code: 'ECE', name: 'Electronics & Communication', hod: 'Dr. Sunita Rao', building: 'Science Block' },
    { id: 'dept_hum', code: 'HUM', name: 'Humanities & Social Sciences', hod: 'Dr. A. Sharma', building: 'Arts Wing' }
  ]);

  const [classrooms, setClassrooms] = useState([
    { id: 'rm_101', code: 'LH-101', name: 'Lecture Hall 101', capacity: 60, isLab: false, isSmart: true, building: 'Main Block' },
    { id: 'rm_102', code: 'LH-102', name: 'Lecture Hall 102', capacity: 60, isLab: false, isSmart: true, building: 'Main Block' },
    { id: 'rm_lab1', code: 'CLAB-1', name: 'Computer Science Lab 1', capacity: 40, isLab: true, isSmart: true, building: 'Tech Block' }
  ]);

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) return;
    setDepartments(prev => [
      ...prev,
      { id: `dept_${newCode.toLowerCase()}`, code: newCode, name: newName, hod: 'TBD', building: 'Main Block' }
    ]);
    setNewCode('');
    setNewName('');
    setShowDeptModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            College Master Data Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage institutional departments, classrooms, faculty allocations, and time slots.
          </p>
        </div>

        <button
          onClick={() => setShowDeptModal(true)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Master Record</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'DEPARTMENTS', label: 'Departments', icon: Building2 },
          { id: 'CLASSROOMS', label: 'Classrooms & Labs', icon: School },
          { id: 'FACULTY', label: 'Faculty Members', icon: Users },
          { id: 'SLOTS', label: 'Time Slots', icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content depending on activeTab */}
      {activeTab === 'DEPARTMENTS' && (
        <Card title="University Departments" subtitle="Active academic faculties">
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Department Name</th>
                  <th className="p-3">Head of Dept (HOD)</th>
                  <th className="p-3">Building Block</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {departments.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{d.code}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{d.name}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{d.hod}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{d.building}</td>
                    <td className="p-3"><Badge variant="success">ACTIVE</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'CLASSROOMS' && (
        <Card title="Classrooms & Laboratories" subtitle="Physical venue capacity & equipment">
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Room Code</th>
                  <th className="p-3">Venue Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Seating Capacity</th>
                  <th className="p-3">Smart Features</th>
                  <th className="p-3">Building Block</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {classrooms.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{c.code}</td>
                    <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{c.name}</td>
                    <td className="p-3">
                      <Badge variant={c.isLab ? 'info' : 'default'}>{c.isLab ? 'LABORATORY' : 'CLASSROOM'}</Badge>
                    </td>
                    <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{c.capacity} Seats</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{c.isSmart ? 'Projector + Smart Board' : 'Standard'}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{c.building}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Department Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Add New Department</h3>
            <form onSubmit={handleAddDepartment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Department Code</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                  placeholder="E.g. AI, CHE, MATH"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Department Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                  placeholder="E.g. Artificial Intelligence & Data Science"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeptModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
