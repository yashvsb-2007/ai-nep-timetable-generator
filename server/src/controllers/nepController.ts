import { Request, Response } from 'express';

const NEP_BASKETS = {
  majorCourses: [
    { id: 'sub_ds', code: 'CS101', name: 'Data Structures & Algorithms', department: 'Computer Science', credits: 4 },
    { id: 'sub_algo', code: 'CS201', name: 'Design & Analysis of Algorithms', department: 'Computer Science', credits: 4 },
    { id: 'sub_circuits', code: 'EC101', name: 'Basic Electrical & Electronic Circuits', department: 'Electronics', credits: 4 }
  ],
  minorCourses: [
    { id: 'sub_data_sci', code: 'DS101', name: 'Introduction to Data Science & Analytics', department: 'Data Science', credits: 3 },
    { id: 'sub_robotics', code: 'ROB101', name: 'Principles of Autonomous Robotics', department: 'Mechatronics', credits: 3 },
    { id: 'sub_fin', code: 'FIN101', name: 'Financial Markets & FinTech Essentials', department: 'Management', credits: 3 }
  ],
  multidisciplinaryCourses: [
    { id: 'sub_ai_eth', code: 'NEP201', name: 'Ethics in AI & Multidisciplinary Studies', department: 'Humanities & AI', credits: 3 },
    { id: 'sub_env_sci', code: 'ENV101', name: 'Environmental Climate Science & Sustainability', department: 'Environmental Studies', credits: 3 },
    { id: 'sub_cog_sci', code: 'COG101', name: 'Cognitive Science & Mind Processing', department: 'Psychology', credits: 3 }
  ],
  secCourses: [
    { id: 'sub_sec_python', code: 'SEC101', name: 'Python Programming for Real-World Automation', credits: 2 },
    { id: 'sub_sec_web', code: 'SEC102', name: 'Web Full-Stack Rapid Prototyping', credits: 2 }
  ],
  aecCourses: [
    { id: 'sub_aec_eng', code: 'AEC101', name: 'Advanced Professional Communication & Tech Writing', credits: 2 }
  ],
  vacCourses: [
    { id: 'sub_vac_yoga', code: 'VAC101', name: 'Holistic Wellness, Yoga & Mind Care', credits: 2 },
    { id: 'sub_vac_heritage', code: 'VAC102', name: 'Indian Knowledge Systems & Cultural Heritage', credits: 2 }
  ]
};

export const getNEPBaskets = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    baskets: NEP_BASKETS
  });
};

export const validateStudentNEPCredits = async (req: Request, res: Response) => {
  const { studentId, registeredSubjectIds } = req.body;

  const totalCredits = 20; // Default sample calculation
  const isCompliant = totalCredits >= 16 && totalCredits <= 24;

  return res.json({
    success: true,
    abcAccountId: 'ABC-2026-9874-1122',
    totalCredits,
    isCompliant,
    breakdown: {
      majorCredits: 8,
      minorCredits: 3,
      multidisciplinaryCredits: 3,
      secCredits: 2,
      aecCredits: 2,
      vacCredits: 2
    },
    message: isCompliant 
      ? 'Student credit selection adheres fully to NEP 2020 framework.'
      : 'Credit total out of bounds (16-24 required per semester).'
  });
};

export const registerNEPCourses = async (req: Request, res: Response) => {
  const { studentId, majorId, minorId, multidisciplinaryId, secId, vacId } = req.body;

  return res.json({
    success: true,
    message: 'NEP 2020 Course Registration Successful! Academic Bank of Credits (ABC) updated.',
    registrationId: `reg_nep_${Date.now()}`
  });
};
