import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
import * as authController from '../controllers/authController';
import * as timetableController from '../controllers/timetableController';
import * as nepController from '../controllers/nepController';
import * as collegeController from '../controllers/collegeController';
import * as reportController from '../controllers/reportController';
import * as facultyController from '../controllers/facultyController';
import * as studentController from '../controllers/studentController';

const router = Router();

// Auth Routes
router.post('/auth/login', authController.login);
router.get('/auth/profile', authenticateJWT, authController.getProfile);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password', authController.resetPassword);

// Timetable Routes
router.get('/timetable', timetableController.getTimetable);
router.post('/timetable/generate', authenticateJWT, authorizeRoles('COLLEGE_ADMIN', 'DEPT_ADMIN', 'HOD'), timetableController.generateTimetable);
router.post('/timetable/update-slot', authenticateJWT, authorizeRoles('COLLEGE_ADMIN', 'DEPT_ADMIN', 'HOD'), timetableController.updateSlotManual);
router.get('/timetable/validate', timetableController.validateTimetable);

// NEP 2020 Routes
router.get('/nep/baskets', nepController.getNEPBaskets);
router.post('/nep/validate-credits', nepController.validateStudentNEPCredits);
router.post('/nep/register-courses', nepController.registerNEPCourses);

// College Master Routes
router.get('/college/departments', collegeController.getDepartments);
router.post('/college/departments', authenticateJWT, authorizeRoles('COLLEGE_ADMIN'), collegeController.createDepartment);
router.get('/college/classrooms', collegeController.getClassrooms);
router.post('/college/classrooms', authenticateJWT, authorizeRoles('COLLEGE_ADMIN'), collegeController.createClassroom);
router.get('/college/time-slots', collegeController.getTimeSlots);

// Faculty Routes
router.get('/faculty/list', facultyController.getFacultyList);
router.post('/faculty/preferences', authenticateJWT, facultyController.updateFacultyPreferences);
router.post('/faculty/leave', authenticateJWT, facultyController.submitFacultyLeave);

// Student Routes
router.get('/student/profile', authenticateJWT, studentController.getStudentProfile);
router.get('/student/timetable', authenticateJWT, studentController.getStudentTimetable);

// Report Routes
router.get('/reports/workload', authenticateJWT, reportController.getWorkloadReport);
router.get('/reports/room-utilization', authenticateJWT, reportController.getRoomUtilizationReport);
router.get('/reports/nep-audit', authenticateJWT, reportController.getNEPCreditAudit);

export default router;
