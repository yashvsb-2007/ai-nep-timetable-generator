import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { Calendar, Clock, CheckCircle2, Send, AlertTriangle } from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Faculty Portal - Dr. Priya Sundaram
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Department of Computer Science & Engineering | Employee ID: EMP-1001
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card title="Today's Teaching Schedule" subtitle="Monday, Academic Year 2026-2027" className="lg:col-span-2">
          <div className="space-y-3 mt-2">
            {[
              { time: '09:00 - 10:00 AM', subject: 'Data Structures & Algorithms', code: 'CS101', room: 'LH-101 (Main Block)', type: 'MAJOR', section: 'CSE 1-A' },
              { time: '10:00 - 11:00 AM', subject: 'Data Structures Lab (Contiguous Slot 1)', code: 'CS101L', room: 'CLAB-1 (Tech Block)', type: 'MAJOR', section: 'CSE 1-A' },
              { time: '11:00 - 12:00 PM', subject: 'Data Structures Lab (Contiguous Slot 2)', code: 'CS101L', room: 'CLAB-1 (Tech Block)', type: 'MAJOR', section: 'CSE 1-A' }
            ].map((slot, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge courseType={slot.type as any}>{slot.code}</Badge>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{slot.subject}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Section: {slot.section} | Venue: {slot.room}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                  {slot.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Leave Request & Availability Preferences */}
        <Card title="Leave & Availability Preference" subtitle="Submit unavailability to AI Solver">
          {!leaveSubmitted ? (
            <form onSubmit={handleLeaveSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Reason for Leave / Unavailability</label>
                <textarea
                  rows={3}
                  required
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="E.g., Academic Conference / Medical Leave"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Leave Request</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Leave Request Submitted</p>
              <p className="text-[11px] text-slate-500 mt-0.5">HOD notified. AI solver will exclude your slots accordingly.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
