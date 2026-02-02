import { User, UserRole, School, Course, Lesson, Assignment, Certificate, AttendanceRecord, Notification, StatMetric, Submission, QuizQuestion, AuditLog, Invoice, GradeBookEntry, CalendarEvent, ChatContact, ChatMessage } from '../types';

export const SCHOOLS: School[] = [
  { id: 's1', name: 'Lincoln High', plan: 'ENTERPRISE', studentCount: 1250, teacherCount: 85, logo: 'https://picsum.photos/id/1/200', status: 'ACTIVE', joinedDate: '2024-08-15', revenue: 2500 },
  { id: 's2', name: 'Tech Academy', plan: 'PRO', studentCount: 450, teacherCount: 30, logo: 'https://picsum.photos/id/2/200', status: 'ACTIVE', joinedDate: '2025-01-10', revenue: 950 },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Aziza Talaba', email: 'aziza@lincoln.edu', role: UserRole.STUDENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/101/100', status: 'ACTIVE', lastActive: '2 daqiqa oldin' },
  { id: 'u2', name: 'Janob Smit', email: 'smith@lincoln.edu', role: UserRole.TEACHER, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/102/100', status: 'ACTIVE', lastActive: '1 soat oldin' },
  { id: 'u3', name: 'Dr. Karter', email: 'director@lincoln.edu', role: UserRole.DIRECTOR, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/103/100', status: 'ACTIVE', lastActive: 'Hozirgina' },
  { id: 'u4', name: 'Super Admin', email: 'admin@edunexus.com', role: UserRole.ADMIN, schoolId: 'global', avatarUrl: 'https://picsum.photos/id/104/100', status: 'ACTIVE' },
  { id: 'u5', name: 'Xonim Jonson', email: 'johnson@lincoln.edu', role: UserRole.TEACHER, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/105/100', status: 'ACTIVE', lastActive: '3 soat oldin' },
  { id: 'u6', name: 'Bobur Quruvchi', email: 'bob@lincoln.edu', role: UserRole.STUDENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/106/100', status: 'ACTIVE', lastActive: '1 kun oldin' },
  // Parent
  { id: 'u9', name: 'Vali Ota', email: 'parent@lincoln.edu', role: UserRole.PARENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/109/100', status: 'ACTIVE', lastActive: '5 daqiqa oldin', childrenIds: ['u1'] },
];

export const COURSES: Course[] = [
  // Academic Courses
  { id: 'c1', title: 'Oliy Matematika', teacherId: 'u2', schoolId: 's1', description: 'Kalkulyus va Chiziqli Algebra', thumbnail: 'https://picsum.photos/id/201/400/200', progress: 75, totalLessons: 12, completedLessons: 9, averageGrade: 88, category: 'ACADEMIC' },
  { id: 'c2', title: 'Jahon Tarixi', teacherId: 'u2', schoolId: 's1', description: 'Qadimgi sivilizatsiyalardan hozirgi kungacha', thumbnail: 'https://picsum.photos/id/202/400/200', progress: 30, totalLessons: 15, completedLessons: 4, averageGrade: 92, category: 'ACADEMIC' },
  { id: 'c3', title: 'Fizika 101', teacherId: 'u5', schoolId: 's1', description: 'Mexanika va Termodinamika', thumbnail: 'https://picsum.photos/id/203/400/200', progress: 0, totalLessons: 10, completedLessons: 0, averageGrade: 76, category: 'ACADEMIC' },
  
  // Paid / Certificate Courses
  { id: 'p1', title: 'IELTS Intensive', teacherId: 'u5', schoolId: 's1', description: '7.5+ band score target. Speaking & Writing focus.', thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=2071', progress: 0, totalLessons: 24, completedLessons: 0, isPaid: true, price: 150, category: 'IELTS', meetingLink: 'https://zoom.us/j/123456789' },
  { id: 'p2', title: 'SAT Math Prep', teacherId: 'u2', schoolId: 's1', description: 'Master SAT Math section. Practice tests included.', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070', progress: 0, totalLessons: 18, completedLessons: 0, isPaid: true, price: 120, category: 'SAT', meetingLink: 'https://zoom.us/j/987654321' },
  { id: 'p3', title: 'Frontend ReactJS', teacherId: 'u2', schoolId: 's1', description: 'Zero to Hero in React Development.', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070', progress: 0, totalLessons: 30, completedLessons: 0, isPaid: true, price: 200, category: 'IT' },
];

export const LESSONS: Lesson[] = [
  { id: 'l1', courseId: 'c1', title: '1.1 Limitlarga kirish', type: 'VIDEO', content: '...', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', duration: '15:30', isCompleted: true },
  { id: 'l2', courseId: 'c1', title: '1.2 Hosilani hisoblash', type: 'TEXT', content: '...', duration: '10 daqiqa', isCompleted: true },
  { id: 'l3', courseId: 'c1', title: '1.3 Integrallar Testi', type: 'QUIZ', content: '...', duration: '20 daqiqa', isCompleted: false },
  { id: 'l4', courseId: 'c2', title: 'Rim Respublikasi', type: 'VIDEO', content: '...', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', duration: '45:00', isCompleted: true }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'Kalkulyus Masalalari 1', dueDate: '2026-11-15', status: 'GRADED', grade: 92, maxGrade: 100, description: '...' },
  { id: 'a2', courseId: 'c2', title: 'Tarix Inshosi: Rim Imperiyasi', dueDate: '2026-11-20', status: 'PENDING', maxGrade: 100, description: '...' },
];

export const SUBMISSIONS: Submission[] = [
  { id: 'sub1', assignmentId: 'a2', studentId: 'u1', studentName: 'Aziza Talaba', submittedDate: '2026-11-19', content: '...', status: 'SUBMITTED' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Yangi Baho', message: 'Kalkulyus Masalalari 1 uchun bahongiz chiqdi.', time: '2 soat oldin', read: false, type: 'GRADE' },
  { id: 'n2', title: 'Yangi Kurs', message: 'SAT Math kursi endi mavjud. Ro\'yxatdan o\'ting!', time: '5 soat oldin', read: false, type: 'SYSTEM' },
];

export const CERTIFICATES: Certificate[] = [
  { id: 'cert1', title: 'Algebra Ustasi', issueDate: '2026-05-20', courseName: 'O\'rta Algebra', url: '#' },
];

export const ATTENDANCE: AttendanceRecord[] = [
  { id: 'at1', date: '2026-11-14', status: 'PRESENT', courseId: 'c1', courseName: 'Oliy Matematika' },
  { id: 'at2', date: '2026-11-13', status: 'PRESENT', courseId: 'c1', courseName: 'Oliy Matematika' },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'log1', action: 'Foydalanuvchi Kirishi', actorName: 'Dr. Karter', target: 'Tizim', timestamp: '2026-11-20 08:30:00', schoolId: 's1', type: 'SECURITY' },
];

export const INVOICES: Invoice[] = [
  { id: 'inv-001', schoolId: 's1', date: '2026-11-01', amount: 2500, status: 'PAID', plan: 'Enterprise Rejasi' },
];

// New: Mock Gradebook for Student (100 point system)
export const GRADEBOOK: GradeBookEntry[] = [
  {
    courseId: 'c1',
    courseName: 'Oliy Matematika',
    semester1: { current: 35, midterm: 28, final: 25, total: 88 },
    semester2: { current: 0, midterm: 0, final: 0, total: 0 }
  },
  {
    courseId: 'c2',
    courseName: 'Jahon Tarixi',
    semester1: { current: 38, midterm: 29, final: 28, total: 95 },
    semester2: { current: 0, midterm: 0, final: 0, total: 0 }
  },
  {
    courseId: 'c3',
    courseName: 'Fizika 101',
    semester1: { current: 30, midterm: 25, final: 21, total: 76 },
    semester2: { current: 0, midterm: 0, final: 0, total: 0 }
  }
];

// --- CALENDAR MOCK DATA ---
export const EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Matematika Yakuniy Imtihoni', date: '2026-11-25', type: 'EXAM', time: '09:00', description: 'Algebra va Geometriya bo\'yicha' },
  { id: 'e2', title: 'Mustaqillik Kuni', date: '2026-09-01', type: 'HOLIDAY', description: 'Dam olish kuni' },
  { id: 'e3', title: 'Fizika Laboratoriya', date: '2026-11-20', type: 'EVENT', time: '14:00', description: 'Amaliy mashg\'ulot' },
  { id: 'e4', title: 'Tarix Inshosi Topshirish', date: '2026-11-22', type: 'DEADLINE', time: '23:59', description: 'Rim imperiyasi mavzusi' },
];

// --- CHAT MOCK DATA ---
export const CHAT_CONTACTS: ChatContact[] = [
  { id: 'u2', name: 'Janob Smit', avatar: 'https://picsum.photos/id/102/100', lastMessage: 'Ertangi darsni unutmang!', lastMessageTime: '10:30', unreadCount: 2, isOnline: true, role: 'Teacher' },
  { id: 'u5', name: 'Xonim Jonson', avatar: 'https://picsum.photos/id/105/100', lastMessage: 'Yaxshi natija, Aziza!', lastMessageTime: 'Kecha', unreadCount: 0, isOnline: false, role: 'Teacher' },
  { id: 'u6', name: 'Bobur Quruvchi', avatar: 'https://picsum.photos/id/106/100', lastMessage: 'Vazifani tashlab berolasanmi?', lastMessageTime: 'Kecha', unreadCount: 0, isOnline: true, role: 'Student' },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', senderId: 'u2', receiverId: 'u1', content: 'Salom Aziza, ertaga qo\'shimcha dars bo\'ladi.', timestamp: '10:28', isRead: true },
  { id: 'm2', senderId: 'u2', receiverId: 'u1', content: 'Ertangi darsni unutmang!', timestamp: '10:30', isRead: false },
  { id: 'm3', senderId: 'u1', receiverId: 'u2', content: 'Rahmat ustoz, albatta boraman.', timestamp: '10:32', isRead: true },
];

export const getSchoolStats = (schoolId: string): StatMetric[] => {
  return [
    { label: 'Jami Talabalar', value: 1250, change: '+5%', trend: 'up' },
    { label: 'O\'rtacha Davomat', value: '94%', change: '+1.2%', trend: 'up' },
    { label: 'O\'rtacha Baho', value: 'B+', change: '-2%', trend: 'down' },
    { label: 'Faol Kurslar', value: 45, change: '0%', trend: 'neutral' },
  ];
};

export const searchPlatform = (query: string, schoolId?: string) => {
  const lowerQuery = query.toLowerCase();
  // ... existing search logic
  const results = {
    users: USERS.filter(u => 
      (u.name.toLowerCase().includes(lowerQuery) || u.email.toLowerCase().includes(lowerQuery)) &&
      (schoolId ? u.schoolId === schoolId : true)
    ),
    courses: COURSES.filter(c => 
      c.title.toLowerCase().includes(lowerQuery) &&
      (schoolId ? c.schoolId === schoolId : true)
    ),
    lessons: LESSONS.filter(l => {
      const course = COURSES.find(c => c.id === l.courseId);
      return l.title.toLowerCase().includes(lowerQuery) && (schoolId ? course?.schoolId === schoolId : true);
    })
  };
  return results;
};