import { User, School, Course, Lesson, Assignment, Submission } from '../types';
import { USERS, SCHOOLS, COURSES, LESSONS, ASSIGNMENTS, SUBMISSIONS } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * AUTHENTICATION API
 */
export const AuthAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Invalid credentials');
    return user;
  },

  register: async (data: { name: string; email: string; schoolCode: string; role: 'STUDENT' | 'TEACHER' }): Promise<User> => {
    await delay(1000);
    // Simulate lookup of school by invite code (using mock logic)
    const school = SCHOOLS.find(s => s.id === 's1'); // Mocking s1 as the default for code
    if (!school) throw new Error('Invalid School Code');

    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role as any,
      schoolId: school.id,
      avatarUrl: `https://ui-avatars.com/api/?name=${data.name}`,
      status: 'PENDING',
      lastActive: 'Just now'
    };
    return newUser;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await delay(1000);
    // Trigger email service
    console.log(`Password reset email sent to ${email}`);
  }
};

/**
 * SCHOOL API
 */
export const SchoolAPI = {
  getById: async (id: string): Promise<School | undefined> => {
    await delay(500);
    return SCHOOLS.find(s => s.id === id);
  },

  getAll: async (): Promise<School[]> => {
    await delay(500);
    return SCHOOLS;
  },

  create: async (data: Partial<School>): Promise<School> => {
    await delay(1000);
    return { ...data, id: `s${Date.now()}` } as School;
  }
};

/**
 * COURSE API
 */
export const CourseAPI = {
  listBySchool: async (schoolId: string): Promise<Course[]> => {
    await delay(500);
    return COURSES.filter(c => c.schoolId === schoolId);
  },

  create: async (data: Partial<Course>): Promise<Course> => {
    await delay(800);
    return { ...data, id: `c${Date.now()}` } as Course;
  }
};

/**
 * USER MANAGEMENT API
 */
export const UserAPI = {
  invite: async (email: string, role: string, schoolId: string): Promise<void> => {
    await delay(600);
    console.log(`Invited ${email} as ${role} to school ${schoolId}`);
  },

  approve: async (userId: string): Promise<void> => {
    await delay(500);
    console.log(`Approved user ${userId}`);
  }
};

/**
 * COMMUNICATION API
 */
export const CommunicationAPI = {
  sendAnnouncement: async (schoolId: string, message: string, targetGroups: string[]): Promise<void> => {
    await delay(1000);
    console.log(`Announcement sent to ${schoolId}: ${message}`);
  }
};
