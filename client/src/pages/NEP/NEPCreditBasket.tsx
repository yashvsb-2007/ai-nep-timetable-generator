import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Badge } from '../../components/UI/Badge';
import { Layers, Shield, CheckCircle2, AlertCircle, BookOpen, Sparkles } from 'lucide-react';

export const NEPCreditBasket: React.FC = () => {
  const [abcInput, setAbcInput] = useState('ABC-2026-9874-1122');
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleValidateABC = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationResult({
      abcId: abcInput,
      status: 'VERIFIED',
      studentName: 'Rohan Verma',
      totalCreditsAccumulated: 42,
      currentSemesterCredits: 20,
      isCompliant: true,
      breakdown: {
        major: 22,
        minor: 8,
        multidisciplinary: 6,
        sec: 4,
        vac: 2
      }
    });
  };

  const baskets = [
    {
      title: 'MAJOR Course Basket (Core Branch)',
      type: 'MAJOR',
      description: 'Primary disciplinary specialization courses required for degree certification.',
      courses: [
        { code: 'CS101', name: 'Data Structures & Algorithms', credits: 4, lab: true },
        { code: 'CS201', name: 'Design & Analysis of Algorithms', credits: 4, lab: false },
        { code: 'EC101', name: 'Basic Electrical & Electronic Circuits', credits: 4, lab: true }
      ]
    },
    {
      title: 'MINOR Disciplinary Basket',
      type: 'MINOR',
      description: 'Secondary domain specialization chosen across engineering or science departments.',
      courses: [
        { code: 'DS101', name: 'Introduction to Data Science & Analytics', credits: 3, lab: true },
        { code: 'ROB101', name: 'Principles of Autonomous Robotics', credits: 3, lab: true },
        { code: 'FIN101', name: 'Financial Markets & FinTech Essentials', credits: 3, lab: false }
      ]
    },
    {
      title: 'MULTIDISCIPLINARY Course Basket',
      type: 'MULTIDISCIPLINARY',
      description: 'Cross-faculty multidisciplinary electives aligned with NEP 2020 broad learning.',
      courses: [
        { code: 'NEP201', name: 'Ethics in AI & Multidisciplinary Studies', credits: 3, lab: false },
        { code: 'ENV101', name: 'Environmental Climate Science & Sustainability', credits: 3, lab: false },
        { code: 'COG101', name: 'Cognitive Science & Mind Processing', credits: 3, lab: false }
      ]
    },
    {
      title: 'Skill Enhancement Courses (SEC)',
      type: 'SEC',
      description: 'Practical hands-on skill courses focusing on industrial readiness.',
      courses: [
        { code: 'SEC101', name: 'Python Programming for Real-World Automation', credits: 2, lab: true },
        { code: 'SEC102', name: 'Web Full-Stack Rapid Prototyping', credits: 2, lab: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2 border border-purple-200 dark:border-purple-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEP 2020 Multidisciplinary Credit System</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Elective & Course Basket Management
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure Major, Minor, Multidisciplinary, SEC, AEC, and VAC course offerings for student enrollment.
        </p>
      </div>

      {/* ABC Validator Card */}
      <Card title="Academic Bank of Credits (ABC) Verification Engine" subtitle="Verify student credit accumulation against national NEP portal">
        <form onSubmit={handleValidateABC} className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <input
            type="text"
            value={abcInput}
            onChange={(e) => setAbcInput(e.target.value)}
            className="flex-1 w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            placeholder="Enter Student ABC Account ID (e.g. ABC-2026-9874-1122)"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center justify-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>Validate ABC Account</span>
          </button>
        </form>

        {validationResult && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-emerald-900 dark:text-emerald-200">
                ABC Account Validated: {validationResult.studentName} ({validationResult.abcId})
              </p>
              <p className="text-emerald-700 dark:text-emerald-300">
                Accumulated Credits: <strong>{validationResult.totalCreditsAccumulated} Credits</strong> | Current Semester: <strong>{validationResult.currentSemesterCredits} Credits</strong>
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold text-[10px] text-emerald-900 dark:text-emerald-200">Major: {validationResult.breakdown.major}</span>
                <span className="bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold text-[10px] text-emerald-900 dark:text-emerald-200">Minor: {validationResult.breakdown.minor}</span>
                <span className="bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold text-[10px] text-emerald-900 dark:text-emerald-200">Multidisciplinary: {validationResult.breakdown.multidisciplinary}</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Baskets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {baskets.map((basket, idx) => (
          <Card key={idx} title={basket.title} subtitle={basket.description}>
            <div className="space-y-3 mt-3">
              {basket.courses.map((c, cIdx) => (
                <div key={cIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge courseType={basket.type as any}>{c.code}</Badge>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{c.name}</span>
                  </div>
                  <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    {c.credits} Credits {c.lab && '• Lab'}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
