import { User, UserRole, School, Course, Lesson, Assignment, Certificate, AttendanceRecord, Notification, StatMetric, Submission, QuizQuestion, AuditLog, Invoice } from '../types';

export const SCHOOLS: School[] = [
  { id: 's1', name: 'Lincoln High', plan: 'ENTERPRISE', studentCount: 1250, teacherCount: 85, logo: 'https://picsum.photos/id/1/200', status: 'ACTIVE', joinedDate: '2022-08-15', revenue: 2500 },
  { id: 's2', name: 'Tech Academy', plan: 'PRO', studentCount: 450, teacherCount: 30, logo: 'https://picsum.photos/id/2/200', status: 'ACTIVE', joinedDate: '2023-01-10', revenue: 950 },
  { id: 's3', name: 'Westside Elementary', plan: 'BASIC', studentCount: 120, teacherCount: 12, logo: 'https://picsum.photos/id/3/200', status: 'INACTIVE', joinedDate: '2023-05-20', revenue: 0 },
  { id: 's4', name: 'Oakridge Prep', plan: 'PRO', studentCount: 340, teacherCount: 25, logo: 'https://picsum.photos/id/4/200', status: 'ACTIVE', joinedDate: '2023-09-01', revenue: 950 },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Aziza Talaba', email: 'aziza@lincoln.edu', role: UserRole.STUDENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/101/100', status: 'ACTIVE', lastActive: '2 daqiqa oldin' },
  { id: 'u2', name: 'Janob Smit', email: 'smith@lincoln.edu', role: UserRole.TEACHER, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/102/100', status: 'ACTIVE', lastActive: '1 soat oldin' },
  { id: 'u3', name: 'Dr. Karter', email: 'director@lincoln.edu', role: UserRole.DIRECTOR, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/103/100', status: 'ACTIVE', lastActive: 'Hozirgina' },
  { id: 'u4', name: 'Super Admin', email: 'admin@edunexus.com', role: UserRole.ADMIN, schoolId: 'global', avatarUrl: 'https://picsum.photos/id/104/100', status: 'ACTIVE' },
  // Extra Users for Director View
  { id: 'u5', name: 'Xonim Jonson', email: 'johnson@lincoln.edu', role: UserRole.TEACHER, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/105/100', status: 'ACTIVE', lastActive: '3 soat oldin' },
  { id: 'u6', name: 'Bobur Quruvchi', email: 'bob@lincoln.edu', role: UserRole.STUDENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/106/100', status: 'ACTIVE', lastActive: '1 kun oldin' },
  { id: 'u7', name: 'Charos Yangi', email: 'charlie@lincoln.edu', role: UserRole.STUDENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/107/100', status: 'PENDING', lastActive: 'Hech qachon' },
  { id: 'u8', name: 'Dono R.', email: 'dana@lincoln.edu', role: UserRole.STUDENT, schoolId: 's1', avatarUrl: 'https://picsum.photos/id/108/100', status: 'ACTIVE', lastActive: '5 kun oldin' },
];

export const COURSES: Course[] = [
  { id: 'c1', title: 'Oliy Matematika', teacherId: 'u2', schoolId: 's1', description: 'Kalkulyus va Chiziqli Algebra', thumbnail: 'https://picsum.photos/id/201/400/200', progress: 75, totalLessons: 12, completedLessons: 9, averageGrade: 88 },
  { id: 'c2', title: 'Jahon Tarixi', teacherId: 'u2', schoolId: 's1', description: 'Qadimgi sivilizatsiyalardan hozirgi kungacha', thumbnail: 'https://picsum.photos/id/202/400/200', progress: 30, totalLessons: 15, completedLessons: 4, averageGrade: 92 },
  { id: 'c3', title: 'Fizika 101', teacherId: 'u5', schoolId: 's1', description: 'Mexanika va Termodinamika', thumbnail: 'https://picsum.photos/id/203/400/200', progress: 0, totalLessons: 10, completedLessons: 0, averageGrade: 76 },
];

export const LESSONS: Lesson[] = [
  { 
    id: 'l1', courseId: 'c1', title: '1.1 Limitlarga kirish', type: 'VIDEO', 
    content: 'Limitlar tushunchasi oliy matematikaning asosidir. Ushbu darsda biz ta\'riflarni ko\'rib chiqamiz...', 
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '15:30', isCompleted: true,
    attachments: [{ name: 'Limitlar_Topshiriq.pdf', url: '#', type: 'PDF' }]
  },
  { 
    id: 'l2', courseId: 'c1', title: '1.2 Hosilani hisoblash', type: 'TEXT', 
    content: 'Hosila o\'zgarish tezligini ifodalaydi. ## Asosiy Formulalar \n - Daraja qoidasi \n - Zanjir qoidasi \n\n Batafsil misollar uchun ilova qilingan hujjatni o\'qing.',
    duration: '10 daqiqa', isCompleted: true,
    attachments: [{ name: 'Hosila_Qollanma.pdf', url: '#', type: 'PDF' }]
  },
  { 
    id: 'l3', courseId: 'c1', title: '1.3 Integrallar Testi', type: 'QUIZ', 
    content: 'Asosiy integrallash usullari bo\'yicha bilimingizni sinab ko\'ring.',
    duration: '20 daqiqa', isCompleted: false
  },
  {
    id: 'l4', courseId: 'c2', title: 'Rim Respublikasi', type: 'VIDEO',
    content: 'Rimning kichik shahar-davlatdan hukmron kuchga aylanishi.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '45:00', isCompleted: true
  }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'Kalkulyus Masalalari 1', dueDate: '2023-11-15', status: 'GRADED', grade: 92, maxGrade: 100, description: '3-bobdagi 1-10 mashqlarni bajaring.' },
  { id: 'a2', courseId: 'c2', title: 'Tarix Inshosi: Rim Imperiyasi', dueDate: '2023-11-20', status: 'PENDING', maxGrade: 100, description: 'Respublikaning qulashi haqida 500 so\'zli insho yozing.' },
  { id: 'a3', courseId: 'c3', title: 'Laboratoriya: Mayatniklar', dueDate: '2023-11-25', status: 'PENDING', maxGrade: 50, description: 'Mayatnik tajribasi natijalarini yuboring.' },
  { id: 'a4', courseId: 'c1', title: 'Oraliq Nazorat', dueDate: '2023-10-30', status: 'SUBMITTED', description: 'Nazorat paketingizni yuklang.' },
];

export const SUBMISSIONS: Submission[] = [
  { id: 'sub1', assignmentId: 'a2', studentId: 'u1', studentName: 'Aziza Talaba', submittedDate: '2023-11-19', content: 'Rim Respublikasi iqtisodiy beqarorlik va harbiy kengayish tufayli quladi...', status: 'SUBMITTED' },
  { id: 'sub2', assignmentId: 'a1', studentId: 'u6', studentName: 'Bobur Quruvchi', submittedDate: '2023-11-14', content: 'PDF faylni ko\'ring.', status: 'GRADED', grade: 88, feedback: 'Yaxshi ish, 4-misoldagi ishoralarni tekshiring.' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', lessonId: 'l3', question: '2x ning integrali nima?', options: ['x^2 + C', '2x^2 + C', 'x + C', '2'], correctAnswer: 0, type: 'MULTIPLE_CHOICE' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Yangi Baho', message: 'Kalkulyus Masalalari 1 uchun bahongiz chiqdi.', time: '2 soat oldin', read: false, type: 'GRADE' },
  { id: 'n2', title: 'Topshiriq Muddati', message: 'Tarix Inshosi ertaga topshirilishi kerak.', time: '5 soat oldin', read: false, type: 'ASSIGNMENT' },
  { id: 'n3', title: 'EduNexus-ga Xush Kelibsiz', message: 'Yangi semestr bilan tabriklaymiz!', time: '1 kun oldin', read: true, type: 'SYSTEM' },
];

export const CERTIFICATES: Certificate[] = [
  { id: 'cert1', title: 'Algebra Ustasi', issueDate: '2023-05-20', courseName: 'O\'rta Algebra', url: '#' },
  { id: 'cert2', title: 'Faxriy Yorliq', issueDate: '2023-06-15', courseName: 'Bahorgi Semestr 2023', url: '#' },
];

export const ATTENDANCE: AttendanceRecord[] = [
  { id: 'at1', date: '2023-11-14', status: 'PRESENT', courseId: 'c1', courseName: 'Oliy Matematika' },
  { id: 'at2', date: '2023-11-13', status: 'PRESENT', courseId: 'c1', courseName: 'Oliy Matematika' },
  { id: 'at3', date: '2023-11-12', status: 'ABSENT', courseId: 'c2', courseName: 'Jahon Tarixi' },
  { id: 'at4', date: '2023-11-11', status: 'PRESENT', courseId: 'c3', courseName: 'Fizika 101' },
  { id: 'at5', date: '2023-11-10', status: 'LATE', courseId: 'c1', courseName: 'Oliy Matematika' },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'log1', action: 'Foydalanuvchi Kirishi', actorName: 'Dr. Karter', target: 'Tizim', timestamp: '2023-11-20 08:30:00', schoolId: 's1', type: 'SECURITY' },
  { id: 'log2', action: 'Baho Yangilandi', actorName: 'Janob Smit', target: 'Aziza Talaba - Kalkulyus', timestamp: '2023-11-19 14:15:00', schoolId: 's1', type: 'ACADEMIC' },
  { id: 'log3', action: 'Kurs Yaratildi', actorName: 'Janob Smit', target: 'Oliy Matematika', timestamp: '2023-11-10 09:00:00', schoolId: 's1', type: 'ACADEMIC' },
  { id: 'log4', action: 'O\'qituvchi Qo\'shildi', actorName: 'Dr. Karter', target: 'Xonim Jonson', timestamp: '2023-11-05 11:20:00', schoolId: 's1', type: 'ADMIN' },
  { id: 'log5', action: 'Hisobot Eksporti', actorName: 'Dr. Karter', target: '3-chorak Moliya', timestamp: '2023-11-01 16:45:00', schoolId: 's1', type: 'ADMIN' },
];

export const INVOICES: Invoice[] = [
  { id: 'inv-001', schoolId: 's1', date: '2023-11-01', amount: 2500, status: 'PAID', plan: 'Enterprise Rejasi' },
  { id: 'inv-002', schoolId: 's1', date: '2023-10-01', amount: 2500, status: 'PAID', plan: 'Enterprise Rejasi' },
  { id: 'inv-003', schoolId: 's1', date: '2023-09-01', amount: 2500, status: 'PAID', plan: 'Enterprise Rejasi' },
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
