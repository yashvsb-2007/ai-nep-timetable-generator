export type UserRole = 'COLLEGE_ADMIN' | 'DEPT_ADMIN' | 'HOD' | 'FACULTY' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  departmentId?: string;
  phone?: string;
  avatarUrl?: string;
}

export type CourseType = 
  | 'MAJOR' 
  | 'MINOR' 
  | 'MULTIDISCIPLINARY' 
  | 'SEC' 
  | 'AEC' 
  | 'VAC' 
  | 'INTERNSHIP';

export interface Subject {
  id: string;
  code: string;
  name: string;
  courseType: CourseType;
  credits: number;
  weeklyLectures: number;
  isLab: boolean;
  departmentId: string;
}

export interface TimetableSlot {
  id: string;
  sectionId: string;
  sectionName: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  courseType: CourseType;
  facultyId: string;
  facultyName: string;
  roomId: string;
  roomCode: string;
  timeSlotId: string;
  dayOfWeek: string;
  slotNumber: number;
  startTime: string;
  endTime: string;
  isLab: boolean;
  hasConflict?: boolean;
  conflictReason?: string;
}

export interface TimetableData {
  id: string;
  academicYear: string;
  semester: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  version: number;
  slots: TimetableSlot[];
}

export interface Department {
  id: string;
  code: string;
  name: string;
  hodName: string;
  building: string;
}

export interface Classroom {
  id: string;
  code: string;
  name: string;
  capacity: number;
  isLab: boolean;
  isSmart: boolean;
  building: string;
}

export interface TimeSlot {
  id: string;
  dayOfWeek: string;
  slotNumber: number;
  startTime: string;
  endTime: string;
  isBreak: boolean;
  breakType?: string;
}

export interface Faculty {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  email: string;
  maxWeeklyHours: number;
  preferredSlots: string[];
  subjectsHandled: string[];
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  departmentId: string;
  programName: string;
  semester: number;
  sectionName: string;
  abcAccountId?: string;
  totalCredits: number;
  registeredSubjects: {
    id: string;
    name: string;
    type: CourseType;
    credits: number;
  }[];
}
