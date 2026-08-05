import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { AuthenticatedRequest } from '../middleware/auth';

// In-memory timetable state repository for instant interaction
let activeTimetable = {
  id: 'tb_2026_sem1',
  academicYear: '2026-2027',
  semester: 1,
  status: 'PUBLISHED',
  version: 1.2,
  createdAt: new Date().toISOString(),
  slots: [
    {
      id: 'slot_1',
      sectionId: 'sec_cse_a',
      sectionName: 'CSE 1-A',
      subjectId: 'sub_ds',
      subjectCode: 'CS101',
      subjectName: 'Data Structures & Algorithms',
      courseType: 'MAJOR',
      facultyId: 'fac_1',
      facultyName: 'Dr. Priya Sundaram',
      roomId: 'rm_101',
      roomCode: 'LH-101',
      timeSlotId: 'ts_mon_1',
      dayOfWeek: 'MONDAY',
      slotNumber: 1,
      startTime: '09:00',
      endTime: '10:00',
      isLab: false
    },
    {
      id: 'slot_2',
      sectionId: 'sec_cse_a',
      sectionName: 'CSE 1-A',
      subjectId: 'sub_dsa_lab',
      subjectCode: 'CS101L',
      subjectName: 'Data Structures Lab',
      courseType: 'MAJOR',
      facultyId: 'fac_1',
      facultyName: 'Dr. Priya Sundaram',
      roomId: 'rm_lab1',
      roomCode: 'CLAB-1',
      timeSlotId: 'ts_mon_2',
      dayOfWeek: 'MONDAY',
      slotNumber: 2,
      startTime: '10:00',
      endTime: '11:00',
      isLab: true
    },
    {
      id: 'slot_3',
      sectionId: 'sec_cse_a',
      sectionName: 'CSE 1-A',
      subjectId: 'sub_ai_eth',
      subjectCode: 'NEP201',
      subjectName: 'Ethics in AI & Multidisciplinary Studies',
      courseType: 'MULTIDISCIPLINARY',
      facultyId: 'fac_2',
      facultyName: 'Prof. Rajesh Kumar',
      roomId: 'rm_102',
      roomCode: 'LH-102',
      timeSlotId: 'ts_mon_3',
      dayOfWeek: 'MONDAY',
      slotNumber: 3,
      startTime: '11:00',
      endTime: '12:00',
      isLab: false
    },
    {
      id: 'slot_4',
      sectionId: 'sec_ece_a',
      sectionName: 'ECE 1-A',
      subjectId: 'sub_math',
      subjectCode: 'MA101',
      subjectName: 'Linear Algebra & Calculus',
      courseType: 'MAJOR',
      facultyId: 'fac_3',
      facultyName: 'Dr. Sunita Rao',
      roomId: 'rm_103',
      roomCode: 'LH-103',
      timeSlotId: 'ts_tue_1',
      dayOfWeek: 'TUESDAY',
      slotNumber: 1,
      startTime: '09:00',
      endTime: '10:00',
      isLab: false
    }
  ]
};

export const getTimetable = async (req: Request, res: Response) => {
  const { departmentId, facultyId, roomId, sectionId } = req.query;

  let filteredSlots = activeTimetable.slots;
  if (sectionId) {
    filteredSlots = filteredSlots.filter(s => s.sectionId === sectionId);
  }
  if (facultyId) {
    filteredSlots = filteredSlots.filter(s => s.facultyId === facultyId);
  }
  if (roomId) {
    filteredSlots = filteredSlots.filter(s => s.roomId === roomId);
  }

  return res.json({
    success: true,
    timetable: {
      ...activeTimetable,
      slots: filteredSlots
    }
  });
};

export const generateTimetable = async (req: AuthenticatedRequest, res: Response) => {
  const payload = req.body;

  // Formulate complete payload if minimal request sent
  const samplePayload = {
    academicYear: payload.academicYear || '2026-2027',
    semester: payload.semester || 1,
    departments: payload.departments || ['dept_cse', 'dept_ece', 'dept_hum'],
    timeSlots: payload.timeSlots || [
      { id: 'ts_mon_1', dayOfWeek: 'MONDAY', slotNumber: 1, startTime: '09:00', endTime: '10:00', isBreak: false },
      { id: 'ts_mon_2', dayOfWeek: 'MONDAY', slotNumber: 2, startTime: '10:00', endTime: '11:00', isBreak: false },
      { id: 'ts_mon_3', dayOfWeek: 'MONDAY', slotNumber: 3, startTime: '11:00', endTime: '12:00', isBreak: false },
      { id: 'ts_mon_lunch', dayOfWeek: 'MONDAY', slotNumber: 4, startTime: '12:00', endTime: '13:00', isBreak: true },
      { id: 'ts_mon_5', dayOfWeek: 'MONDAY', slotNumber: 5, startTime: '13:00', endTime: '14:00', isBreak: false },
      { id: 'ts_tue_1', dayOfWeek: 'TUESDAY', slotNumber: 1, startTime: '09:00', endTime: '10:00', isBreak: false },
      { id: 'ts_tue_2', dayOfWeek: 'TUESDAY', slotNumber: 2, startTime: '10:00', endTime: '11:00', isBreak: false }
    ],
    rooms: payload.rooms || [
      { id: 'rm_101', code: 'LH-101', name: 'Lecture Hall 101', capacity: 60, isLab: false, building: 'Main Block' },
      { id: 'rm_102', code: 'LH-102', name: 'Lecture Hall 102', capacity: 60, isLab: false, building: 'Main Block' },
      { id: 'rm_lab1', code: 'CLAB-1', name: 'Computer Lab 1', capacity: 40, isLab: true, building: 'Tech Block' }
    ],
    faculty: payload.faculty || [
      { id: 'fac_1', name: 'Dr. Priya Sundaram', departmentId: 'dept_cse', maxWeeklyHours: 16 },
      { id: 'fac_2', name: 'Prof. Rajesh Kumar', departmentId: 'dept_cse', maxWeeklyHours: 18 },
      { id: 'fac_3', name: 'Dr. Sunita Rao', departmentId: 'dept_ece', maxWeeklyHours: 16 }
    ],
    subjects: payload.subjects || [
      { id: 'sub_ds', code: 'CS101', name: 'Data Structures & Algorithms', courseType: 'MAJOR', credits: 4, weeklyLectures: 3, isLab: false, departmentId: 'dept_cse' },
      { id: 'sub_dsa_lab', code: 'CS101L', name: 'Data Structures Lab', courseType: 'MAJOR', credits: 2, weeklyLectures: 2, isLab: true, departmentId: 'dept_cse' },
      { id: 'sub_ai_eth', code: 'NEP201', name: 'Ethics in AI & Multidisciplinary Studies', courseType: 'MULTIDISCIPLINARY', credits: 3, weeklyLectures: 3, isLab: false, departmentId: 'dept_cse' }
    ],
    sections: payload.sections || [
      { id: 'sec_cse_a', name: 'CSE 1-A', departmentId: 'dept_cse', semester: 1, studentCount: 40, majorSubjectIds: ['sub_ds', 'sub_dsa_lab'], multidisciplinarySubjectIds: ['sub_ai_eth'] }
    ]
  };

  const aiResult = await AIService.generateTimetable(samplePayload);

  if (aiResult.status === 'SUCCESS' && aiResult.assignments) {
    activeTimetable.version += 0.1;
    activeTimetable.slots = aiResult.assignments.map((a: any, idx: number) => {
      const subj = samplePayload.subjects.find((s: any) => s.id === a.subjectId) || {};
      const fac = samplePayload.faculty.find((f: any) => f.id === a.facultyId) || {};
      const rm = samplePayload.rooms.find((r: any) => r.id === a.roomId) || {};
      const sec = samplePayload.sections.find((s: any) => s.id === a.sectionId) || {};
      const ts = samplePayload.timeSlots.find((t: any) => t.id === a.timeSlotId) || {};

      return {
        id: `slot_gen_${idx}_${Date.now()}`,
        sectionId: a.sectionId,
        sectionName: sec.name || 'CSE 1-A',
        subjectId: a.subjectId,
        subjectCode: subj.code || 'SUB101',
        subjectName: subj.name || 'Core Course',
        courseType: subj.courseType || 'MAJOR',
        facultyId: a.facultyId,
        facultyName: fac.name || 'Faculty Member',
        roomId: a.roomId,
        roomCode: rm.code || 'LH-101',
        timeSlotId: a.timeSlotId,
        dayOfWeek: a.dayOfWeek || ts.dayOfWeek || 'MONDAY',
        slotNumber: a.slotNumber || ts.slotNumber || 1,
        startTime: ts.startTime || '09:00',
        endTime: ts.endTime || '10:00',
        isLab: a.isLab || subj.isLab || false
      };
    });
  }

  return res.json({
    success: true,
    aiResult,
    timetable: activeTimetable
  });
};

export const updateSlotManual = async (req: AuthenticatedRequest, res: Response) => {
  const { slotId, newTimeSlotId, newRoomId, newFacultyId } = req.body;

  const slotIndex = activeTimetable.slots.findIndex(s => s.id === slotId);
  if (slotIndex === -1) {
    return res.status(404).json({ error: 'Timetable slot not found' });
  }

  const updatedSlot = { ...activeTimetable.slots[slotIndex] };
  if (newTimeSlotId) updatedSlot.timeSlotId = newTimeSlotId;
  if (newRoomId) updatedSlot.roomId = newRoomId;
  if (newFacultyId) updatedSlot.facultyId = newFacultyId;

  activeTimetable.slots[slotIndex] = updatedSlot;

  return res.json({
    success: true,
    message: 'Slot manually updated',
    updatedSlot
  });
};

export const validateTimetable = async (req: Request, res: Response) => {
  const validation = await AIService.validateTimetable({ assignments: activeTimetable.slots });
  return res.json({ success: true, validation });
};
