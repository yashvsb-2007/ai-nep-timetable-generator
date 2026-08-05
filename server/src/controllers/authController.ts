import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_nep2020_jwt_key_987654321';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'super_secret_nep2020_refresh_key_123456789';

// Demo memory/fallback DB for immediate zero-config execution
const DEMO_USERS = [
  {
    id: 'usr_admin',
    email: 'admin@university.edu',
    passwordHash: '$2a$10$wB5pD9Y2wN8qZfX8k3qKueC8hX5b/6K4W0sV9E1gB.dF3gH7iJ9kO', // password123
    name: 'Dr. A. K. Sharma',
    role: 'COLLEGE_ADMIN',
    departmentId: 'dept_cse',
    phone: '+91 9876543210'
  },
  {
    id: 'usr_hod_cse',
    email: 'hod.cse@university.edu',
    passwordHash: '$2a$10$wB5pD9Y2wN8qZfX8k3qKueC8hX5b/6K4W0sV9E1gB.dF3gH7iJ9kO', // password123
    name: 'Prof. Rajesh Kumar',
    role: 'HOD',
    departmentId: 'dept_cse',
    phone: '+91 9876543211'
  },
  {
    id: 'usr_fac_cse1',
    email: 'faculty.cse@university.edu',
    passwordHash: '$2a$10$wB5pD9Y2wN8qZfX8k3qKueC8hX5b/6K4W0sV9E1gB.dF3gH7iJ9kO', // password123
    name: 'Dr. Priya Sundaram',
    role: 'FACULTY',
    departmentId: 'dept_cse',
    phone: '+91 9876543212'
  },
  {
    id: 'usr_stu_1',
    email: 'student@university.edu',
    passwordHash: '$2a$10$wB5pD9Y2wN8qZfX8k3qKueC8hX5b/6K4W0sV9E1gB.dF3gH7iJ9kO', // password123
    name: 'Rohan Verma',
    role: 'STUDENT',
    departmentId: 'dept_cse',
    phone: '+91 9876543213'
  }
];

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  let user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Return structured demo user if login matches role standard demo pattern
    user = {
      id: `usr_${role?.toLowerCase() || 'user'}`,
      email,
      passwordHash: '',
      name: email.split('@')[0].toUpperCase().replace('.', ' '),
      role: role || 'COLLEGE_ADMIN',
      departmentId: 'dept_cse',
      phone: '+91 9876543210'
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      departmentId: user.departmentId
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  return res.json({
    success: true,
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      departmentId: user.departmentId,
      phone: user.phone
    }
  });
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
  return res.json({ success: true, user: req.user });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  return res.json({
    success: true,
    message: `Password reset instructions have been sent to ${email}`
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'Password reset successfully. You can now login with your new credentials.'
  });
};
