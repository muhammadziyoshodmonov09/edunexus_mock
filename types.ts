/**
 * DATABASE SCHEMA REFERENCE (MVP)
 * ... (existing comments)
 */

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  DIRECTOR = 'DIRECTOR',
  ADMIN = 'ADMIN',
  PARENT = 'PARENT' // Added Parent Role
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string;
  avatarUrl?: string;
  status?: 'ACTIVE' | 'PENDING' | 'SUSPENDED'; 
  lastActive?: string;
  childrenIds?: string[]; // For Parents
}

export interface School {
  id: string;
  name: string;
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
  studentCount: number;
  teacherCount: number;
  logo: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinedDate: string;
  revenue: number; 
}

export interface Course {
  id: string;
  title: string;
  teacherId: string;
  schoolId: string;
  description: string;
  thumbnail: string;
  progress?: number; 
  totalLessons?: number;
  completedLessons?: number;
  averageGrade?: number;
  inviteCode?: string;
  isPaid?: boolean; // New: Paid course flag
  price?: number; // New: Price
  category?: 'ACADEMIC' | 'SAT' | 'IELTS' | 'IT' | 'LANG'; // New: Category
  meetingLink?: string; // New: Zoom link
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string; 
  videoUrl?: string;
  duration?: string;
  type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'ASSIGNMENT';
  isCompleted?: boolean;
  attachments?: { name: string; url: string; type: 'PDF' | 'DOC' | 'IMG' }[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'LATE';
  grade?: number;
  maxGrade?: number;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: number; 
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedDate: string;
  content: string; 
  grade?: number;
  feedback?: string;
  status: 'SUBMITTED' | 'GRADED';
}

export interface StatMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  courseName: string;
  url: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  courseId: string;
  courseName: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'GRADE' | 'ASSIGNMENT' | 'SYSTEM';
}

export interface AuditLog {
  id: string;
  action: string;
  actorName: string;
  target: string;
  timestamp: string;
  schoolId: string;
  type: 'SECURITY' | 'ACADEMIC' | 'ADMIN';
}

export interface Invoice {
  id: string;
  schoolId: string;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  plan: string;
}

// New: 100-point system Breakdown
export interface GradeBookEntry {
  courseId: string;
  courseName: string;
  semester1: {
    current: number; // 40 points
    midterm: number; // 30 points
    final: number; // 30 points
    total: number; // 100 max
  };
  semester2: {
    current: number;
    midterm: number;
    final: number;
    total: number;
  };
}