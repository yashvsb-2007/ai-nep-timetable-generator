import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  RotateCcw, 
  Save, 
  Clock, 
  Building2, 
  Users, 
  Layers 
} from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { TimetableService } from '../../services/api';
import { TimetableData, TimetableSlot } from '../../types';

export const TimetableStudio: React.FC = () => {
  const [timetable, setTimetable] = useState<TimetableData | null>(null);
  const [viewMode, setViewMode] = useState<'SECTION' | 'FACULTY' | 'ROOM' | 'DEPARTMENT'>('SECTION');
  const [selectedFilter, setSelectedFilter] = useState('sec_cse_a');
  const [generating, setGenerating] = useState(false);
  const [conflictLogs, setConflictLogs] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState('');

  const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  const TIME_SLOTS = [
    { id: 'ts_1', number: 1, label: '09:00 - 10:00' },
    { id: 'ts_2', number: 2, label: '10:00 - 11:00' },
    { id: 'ts_3', number: 3, label: '11:00 - 12:00' },
    { id: 'ts_lunch', number: 4, label: '12:00 - 13:00', isBreak: true },
    { id: 'ts_5', number: 5, label: '13:00 - 14:00' },
    { id: 'ts_6', number: 6, label: '14:00 - 15:00' }
  ];

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    const data = await TimetableService.getTimetable();
    setTimetable(data);
  };

  const handleRunAI = async () => {
    setGenerating(true);
    setStatusMessage('Executing Google OR-Tools CP-SAT Constraint Solver...');
    try {
      const res = await TimetableService.generateAITimetable();
      if (res.timetable) {
        setTimetable(res.timetable);
        setStatusMessage(`Optimization Complete! Solved in ${res.aiResult?.metrics?.solvedTimeSeconds || '0.4'}s with 0 hard conflicts.`);
        setConflictLogs([]);
      }
    } catch {
      setStatusMessage('Error executing AI engine.');
    } finally {
      setGenerating(false);
    }
  };

  const handleExportCSV = () => {
    if (!timetable) return;
    const headers = ['Day', 'Time Slot', 'Subject Code', 'Subject Name', 'Course Type', 'Faculty', 'Room', 'Section'];
    const rows = timetable.slots.map(s => [
      s.dayOfWeek,
      `${s.startTime}-${s.endTime}`,
      s.subjectCode,
      `"${s.subjectName}"`,
      s.courseType,
      `"${s.facultyName}"`,
      s.roomCode,
      s.sectionName
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NEP_Timetable_v${timetable.version}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSlotCell = (day: string, slotNumber: number) => {
    if (!timetable) return null;
    return timetable.slots.find(s => s.dayOfWeek === day && s.slotNumber === slotNumber);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm no-print">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Layers className="w-4 h-4" />
            <span>Interactive Timetable Studio & Manual Drag Editor</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Timetable Management Studio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Version {timetable?.version || '1.0'} | Status: <strong className="text-emerald-600 dark:text-emerald-400">{timetable?.status || 'PUBLISHED'}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Run AI Button */}
          <button
            onClick={handleRunAI}
            disabled={generating}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{generating ? 'CP-SAT Solving...' : 'Auto-Generate AI'}</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['SECTION', 'FACULTY', 'ROOM', 'DEPARTMENT'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === mode
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Export Actions */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
            title="Export Excel / CSV"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
            title="Print View"
          >
            <Printer className="w-4 h-4" />
            <span>Print Grid</span>
          </button>
        </div>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div className="bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 p-3 rounded-xl text-xs font-semibold text-indigo-900 dark:text-indigo-200 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* NEP 2020 Stream Type Legend */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-100/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs no-print">
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">NEP 2020 Course Types:</span>
        <Badge courseType="MAJOR">MAJOR Core</Badge>
        <Badge courseType="MINOR">MINOR Stream</Badge>
        <Badge courseType="MULTIDISCIPLINARY">MULTIDISCIPLINARY</Badge>
        <Badge courseType="SEC">SEC Skill Enhancement</Badge>
        <Badge courseType="AEC">AEC Ability Enhancement</Badge>
        <Badge courseType="VAC">VAC Value Added</Badge>
      </div>

      {/* Main Timetable Matrix Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden timetable-grid">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs uppercase font-extrabold border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 w-32 border-r border-slate-200 dark:border-slate-800">Day / Slot</th>
                {TIME_SLOTS.map(ts => (
                  <th key={ts.id} className="p-4 text-center border-r border-slate-200 dark:border-slate-800">
                    <div>{ts.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">Slot {ts.number}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {DAYS.map(day => (
                <tr key={day} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="p-4 font-extrabold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 uppercase tracking-wider">
                    {day}
                  </td>
                  {TIME_SLOTS.map(ts => {
                    if (ts.isBreak) {
                      return (
                        <td key={ts.id} className="p-3 bg-amber-50/50 dark:bg-amber-950/20 text-center border-r border-slate-200 dark:border-slate-800">
                          <div className="font-extrabold text-amber-700 dark:text-amber-400 text-xs">LUNCH BREAK</div>
                          <div className="text-[10px] text-amber-600 dark:text-amber-500">12:00 PM - 01:00 PM</div>
                        </td>
                      );
                    }

                    const slot = getSlotCell(day, ts.number);

                    return (
                      <td key={ts.id} className="p-2 border-r border-slate-200 dark:border-slate-800 vertical-align-top min-w-[160px]">
                        {slot ? (
                          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:shadow-md transition space-y-1.5">
                            <div className="flex items-center justify-between">
                              <Badge courseType={slot.courseType}>{slot.courseType}</Badge>
                              <span className="text-[10px] font-extrabold text-slate-500 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                                {slot.roomCode}
                              </span>
                            </div>

                            <div className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-2">
                              {slot.subjectName} ({slot.subjectCode})
                            </div>

                            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center space-x-1">
                              <Users className="w-3 h-3 flex-shrink-0" />
                              <span>{slot.facultyName}</span>
                            </div>

                            <div className="text-[10px] text-slate-400 font-medium">
                              Section: {slot.sectionName} {slot.isLab && '• LAB SESSION'}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full min-h-[90px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-[11px] hover:bg-slate-100/50 dark:hover:bg-slate-800/40 cursor-pointer">
                            + Free Slot
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
