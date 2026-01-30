/**
 * DATABASE SCHEMA REFERENCE (MVP)
 * 
 * SCHOOLS TABLE
 * - id: UUID (PK)
 * - name: VARCHAR
 * - plan: ENUM('BASIC', 'PRO', 'ENTERPRISE')
 * - status: ENUM('ACTIVE', 'INACTIVE')
 * - logo_url: VARCHAR
 * - settings: JSON (theme, features)
 * - created_at: TIMESTAMP
 * 
 * USERS TABLE
 * - id: UUID (PK)
 * - email: VARCHAR (Unique)
 * - password_hash: VARCHAR
 * - role: ENUM('STUDENT', 'TEACHER', 'DIRECTOR', 'ADMIN')
 * - school_id: UUID (FK -> SCHOOLS.id)
 * - name: VARCHAR
 * - avatar_url: VARCHAR
 * - status: ENUM('ACTIVE', 'PENDING', 'SUSPENDED')
 * - last_login: TIMESTAMP
 * 
 * COURSES TABLE
 * - id: UUID (PK)
 * - school_id: UUID (FK -> SCHOOLS.id)
 * - teacher_id: UUID (FK -> USERS.id)
 * - title: VARCHAR
 * - description: TEXT
 * - thumbnail_url: VARCHAR
 * - invite_code: VARCHAR
 * 
 * LESSONS TABLE
 * - id: UUID (PK)
 * - course_id: UUID (FK -> COURSES.id)
 * - title: VARCHAR
 * - type: ENUM('VIDEO', 'TEXT', 'QUIZ')
 * - content: TEXT (Markdown)
 * - video_url: VARCHAR
 * - sort_order: INT
 * 
 * ASSIGNMENTS TABLE
 * - id: UUID (PK)
 * - course_id: UUID (FK -> COURSES.id)
 * - title: VARCHAR
 * - due_date: TIMESTAMP
 * - max_score: INT
 * 
 * SUBMISSIONS TABLE
 * - id: UUID (PK)
 * - assignment_id: UUID (FK -> ASSIGNMENTS.id)
 * - student_id: UUID (FK -> USERS.id)
 * - content: TEXT
 * - attachment_url: VARCHAR
 * - grade: INT
 * - feedback: TEXT
 * - submitted_at: TIMESTAMP
 * 
 * AUDIT_LOGS TABLE
 * - id: UUID (PK)
 * - school_id: UUID (FK -> SCHOOLS.id)
 * - actor_id: UUID (FK -> USERS.id)
 * - action: VARCHAR
 * - target_resource: VARCHAR
 * - created_at: TIMESTAMP
 */

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  DIRECTOR = 'DIRECTOR',
  ADMIN = 'ADMIN'
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
  inviteCode?: string; // New for invite flow
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
