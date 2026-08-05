import { Request, Response } from 'express';

const STUDENTS = [
  {
    id: 'stu_1',
    rollNumber: '2026-CSE-001',
    name: 'Rohan Verma',
    email: 'student@university.edu',
    departmentId: 'dept_cse',
    programName: 'B.Tech Computer Science & Engineering (NEP Multidisciplinary)',
    semester: 1,
    sectionName: 'CSE 1-A',
    abcAccountId: 'ABC-2026-9874-1122',
    totalCredits: 20,
    registeredSubjects: [
      { id: 'sub_ds', name: 'Data Structures & Algorithms', type: 'MAJOR', credits: 4 },
      { id: 'sub_dsa_lab', name: 'Data Structures Lab', type: 'MAJOR', credits: 2 },
      { id: 'sub_data_sci', name: 'Introduction to Data Science & Analytics', type: 'MINOR', credits: 3 },
      { id: 'sub_ai_eth', name: 'Ethics in AI & Multidisciplinary Studies', type: 'MULTIDISCIPLINARY', credits: 3 },
      { id: 'sub_sec_python', name: 'Python Programming for Automation', type: 'SEC', credits: 2 },
      { id: 'sub_aec_eng', name: 'Advanced Professional Communication', type: 'AEC', credits: 2 },
      { id: 'sub_vac_yoga', name: 'Holistic Wellness & Yoga', type: 'VAC', credits: 2 }
    ]
  }
];

export const getStudentProfile = async (req: Request, res: Response) => {
  return res.json({ success: true, student: STUDENTS[0] });
};

export const getStudentTimetable = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    timetable: [
      { dayOfWeek: 'MONDAY', time: '09:00 - 10:00', subject: 'Data Structures & Algorithms (MAJOR)', faculty: 'Dr. Priya Sundaram', room: 'LH-101' },
      { dayOfWeek: 'MONDAY', time: '10:00 - 11:00', subject: 'Data Structures Lab (MAJOR)', faculty: 'Dr. Priya Sundaram', room: 'CLAB-1' },
      { dayOfWeek: 'MONDAY', time: '11:00 - 12:00', subject: 'Ethics in AI & Multidisciplinary Studies (MULTIDISCIPLINARY)', faculty: 'Prof. Rajesh Kumar', room: 'LH-102' },
      { dayOfWeek: 'TUESDAY', time: '09:00 - 10:00', subject: 'Introduction to Data Science & Analytics (MINOR)', faculty: 'Dr. Sunita Rao', room: 'LH-103' },
      { dayOfWeek: 'TUESDAY', time: '10:00 - 11:00', subject: 'Python Programming for Automation (SEC)', faculty: 'Dr. Priya Sundaram', room: 'CLAB-1' }
    ]
  });
};
