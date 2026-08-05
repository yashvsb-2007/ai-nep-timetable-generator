import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nep_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_admin',
      email: 'admin@university.edu',
      name: 'Dr. A. K. Sharma',
      role: 'COLLEGE_ADMIN',
      departmentId: 'dept_cse',
      phone: '+91 9876543210'
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('nep_token') || 'demo_token_2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('nep_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nep_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('nep_token', token);
    } else {
      localStorage.removeItem('nep_token');
    }
  }, [token]);

  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nep_user');
    localStorage.removeItem('nep_token');
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    const roleNames: Record<UserRole, string> = {
      COLLEGE_ADMIN: 'Dr. A. K. Sharma (College Admin)',
      DEPT_ADMIN: 'Prof. Rajesh Kumar (Dept Admin)',
      HOD: 'Prof. Rajesh Kumar (HOD - CSE)',
      FACULTY: 'Dr. Priya Sundaram (Faculty)',
      STUDENT: 'Rohan Verma (Student)'
    };
    const updatedUser: User = {
      ...user,
      role,
      name: roleNames[role] || user.name
    };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
