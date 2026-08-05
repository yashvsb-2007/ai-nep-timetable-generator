import { Request, Response } from 'express';

const DEPARTMENTS = [
  { id: 'dept_cse', code: 'CSE', name: 'Computer Science & Engineering', hodName: 'Prof. Rajesh Kumar', building: 'Tech Block' },
  { id: 'dept_ece', code: 'ECE', name: 'Electronics & Communication', hodName: 'Dr. Sunita Rao', building: 'Science Block' },
  { id: 'dept_hum', code: 'HUM', name: 'Humanities & Social Sciences', hodName: 'Dr. A. Sharma', building: 'Arts Wing' },
  { id: 'dept_mech', code: 'MECH', name: 'Mechanical Engineering', hodName: 'Dr. V. Patel', building: 'Workshop Block' }
];

const ROOMS = [
  { id: 'rm_101', code: 'LH-101', name: 'Lecture Hall 101', capacity: 60, isLab: false, isSmart: true, building: 'Main Block' },
  { id: 'rm_102', code: 'LH-102', name: 'Lecture Hall 102', capacity: 60, isLab: false, isSmart: true, building: 'Main Block' },
  { id: 'rm_103', code: 'LH-103', name: 'Lecture Hall 103', capacity: 60, isLab: false, isSmart: false, building: 'Science Block' },
  { id: 'rm_lab1', code: 'CLAB-1', name: 'Computer Science Lab 1', capacity: 40, isLab: true, isSmart: true, building: 'Tech Block' },
  { id: 'rm_lab2', code: 'ELAB-1', name: 'Electronics Lab 1', capacity: 40, isLab: true, isSmart: false, building: 'Science Block' }
];

const TIME_SLOTS = [
  { id: 'ts_mon_1', dayOfWeek: 'MONDAY', slotNumber: 1, startTime: '09:00', endTime: '10:00', isBreak: false },
  { id: 'ts_mon_2', dayOfWeek: 'MONDAY', slotNumber: 2, startTime: '10:00', endTime: '11:00', isBreak: false },
  { id: 'ts_mon_3', dayOfWeek: 'MONDAY', slotNumber: 3, startTime: '11:00', endTime: '12:00', isBreak: false },
  { id: 'ts_mon_lunch', dayOfWeek: 'MONDAY', slotNumber: 4, startTime: '12:00', endTime: '13:00', isBreak: true, breakType: 'LUNCH' },
  { id: 'ts_mon_5', dayOfWeek: 'MONDAY', slotNumber: 5, startTime: '13:00', endTime: '14:00', isBreak: false },
  { id: 'ts_mon_6', dayOfWeek: 'MONDAY', slotNumber: 6, startTime: '14:00', endTime: '15:00', isBreak: false }
];

export const getDepartments = async (req: Request, res: Response) => {
  return res.json({ success: true, departments: DEPARTMENTS });
};

export const getClassrooms = async (req: Request, res: Response) => {
  return res.json({ success: true, classrooms: ROOMS });
};

export const getTimeSlots = async (req: Request, res: Response) => {
  return res.json({ success: true, timeSlots: TIME_SLOTS });
};

export const createDepartment = async (req: Request, res: Response) => {
  const { code, name, hodName, building } = req.body;
  const newDept = {
    id: `dept_${code.toLowerCase()}_${Date.now()}`,
    code,
    name,
    hodName: hodName || 'TBD',
    building: building || 'Main Block'
  };
  DEPARTMENTS.push(newDept);
  return res.status(201).json({ success: true, department: newDept });
};

export const createClassroom = async (req: Request, res: Response) => {
  const { code, name, capacity, isLab, isSmart, building } = req.body;
  const newRoom = {
    id: `rm_${code.toLowerCase()}_${Date.now()}`,
    code,
    name,
    capacity: capacity || 60,
    isLab: isLab || false,
    isSmart: isSmart || false,
    building: building || 'Main Block'
  };
  ROOMS.push(newRoom);
  return res.status(201).json({ success: true, classroom: newRoom });
};
