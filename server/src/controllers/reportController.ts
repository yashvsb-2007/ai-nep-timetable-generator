import { Request, Response } from 'express';

export const getWorkloadReport = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      { facultyId: 'fac_1', name: 'Dr. Priya Sundaram', department: 'Computer Science', totalHours: 14, maxHours: 16, status: 'OPTIMAL', subjectCount: 3 },
      { facultyId: 'fac_2', name: 'Prof. Rajesh Kumar', department: 'Computer Science', totalHours: 18, maxHours: 18, status: 'MAXIMUM', subjectCount: 4 },
      { facultyId: 'fac_3', name: 'Dr. Sunita Rao', department: 'Electronics', totalHours: 12, maxHours: 16, status: 'OPTIMAL', subjectCount: 2 },
      { facultyId: 'fac_4', name: 'Dr. V. Patel', department: 'Mechanical Engineering', totalHours: 10, maxHours: 16, status: 'UNDERUTILIZED', subjectCount: 2 }
    ]
  });
};

export const getRoomUtilizationReport = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: [
      { roomId: 'rm_101', roomCode: 'LH-101', type: 'Classroom', capacity: 60, utilizationPercentage: 87.5, occupiedSlots: 28, totalSlots: 32 },
      { roomId: 'rm_102', roomCode: 'LH-102', type: 'Classroom', capacity: 60, utilizationPercentage: 81.2, occupiedSlots: 26, totalSlots: 32 },
      { roomId: 'rm_lab1', roomCode: 'CLAB-1', type: 'Lab', capacity: 40, utilizationPercentage: 75.0, occupiedSlots: 24, totalSlots: 32 }
    ]
  });
};

export const getNEPCreditAudit = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    stats: {
      totalRegisteredStudents: 450,
      nepCompliantCount: 438,
      nonCompliantCount: 12,
      majorMinorRegistrations: 412,
      abcAccountLinkedPercentage: 97.3
    }
  });
};
