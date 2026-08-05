import { Request, Response } from 'express';

const FACULTY_MEMBERS = [
  {
    id: 'fac_1',
    employeeId: 'EMP-1001',
    name: 'Dr. Priya Sundaram',
    designation: 'Associate Professor',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science',
    email: 'faculty.cse@university.edu',
    maxWeeklyHours: 16,
    preferredSlots: ['ts_mon_1', 'ts_mon_2'],
    subjectsHandled: ['Data Structures & Algorithms', 'Data Structures Lab']
  },
  {
    id: 'fac_2',
    employeeId: 'EMP-1002',
    name: 'Prof. Rajesh Kumar',
    designation: 'Professor & HOD',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science',
    email: 'hod.cse@university.edu',
    maxWeeklyHours: 18,
    preferredSlots: ['ts_mon_3'],
    subjectsHandled: ['Ethics in AI & Multidisciplinary Studies', 'Design & Analysis of Algorithms']
  },
  {
    id: 'fac_3',
    employeeId: 'EMP-1003',
    name: 'Dr. Sunita Rao',
    designation: 'Assistant Professor',
    departmentId: 'dept_ece',
    departmentName: 'Electronics & Communication',
    email: 'sunita.rao@university.edu',
    maxWeeklyHours: 16,
    preferredSlots: ['ts_tue_1'],
    subjectsHandled: ['Linear Algebra & Calculus', 'Basic Electrical Circuits']
  }
];

export const getFacultyList = async (req: Request, res: Response) => {
  return res.json({ success: true, faculty: FACULTY_MEMBERS });
};

export const updateFacultyPreferences = async (req: Request, res: Response) => {
  const { facultyId, preferredSlots, unavailableSlots } = req.body;
  return res.json({
    success: true,
    message: 'Faculty availability and slot preferences updated successfully.'
  });
};

export const submitFacultyLeave = async (req: Request, res: Response) => {
  const { facultyId, startDate, endDate, reason } = req.body;
  return res.json({
    success: true,
    message: 'Faculty leave request submitted. HOD & Admin notified.',
    leaveId: `leave_${Date.now()}`
  });
};
