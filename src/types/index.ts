export type SupportLevel = 'support' | 'basic' | 'challenge';

export type GameType = 
  | 'counting'      // Trò chơi 1: Vườn hoa đếm số (1-10)
  | 'shapes'        // Trò chơi 2: Ngôi nhà hình học (tròn, vuông, tam giác, chữ nhật)
  | 'listening'     // Trò chơi 3: Tai tin – Mắt sáng (nghe chỉ tranh)
  | 'behavior'      // Trò chơi 4: Bé chọn điều hay (kỹ năng sống, thói quen tốt)
  | 'story'         // Trò chơi 5: Chuyện kể cùng Ban Ban
  | 'grade1_prep';  // Trò chơi 6: Hành trang vào lớp Một (sắp xếp ba lô, chào hỏi)

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  iconOrVisual?: string; // e.g., 'flower', 'cat', 'circle', 'square', 'backpack'
}

export interface Question {
  id: string;
  topic: string;
  gameType: GameType;
  questionText: string;
  speechText: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  supportLevel: SupportLevel;
  visualCount?: number; // For counting games (1-10)
  shapeType?: 'circle' | 'square' | 'triangle' | 'rectangle'; // For shapes game
  targetItem?: string; // For listening or object match
  status: 'draft' | 'approved' | 'published';
  createdAt: string;
  updatedAt: string;
  author?: string;
  source?: 'seed' | 'ai' | 'teacher';
}

export interface LessonPlan {
  id: string;
  title: string;
  topic: string;
  domain: string;
  ageGroup: string;
  duration: string;
  objectives: {
    knowledge: string;
    skills: string;
    attitude: string;
  };
  preparation: {
    teacher: string;
    children: string;
    space: string;
  };
  introduction: string;
  coreActivity: string;
  reinforcementGame: string;
  guidingQuestions: string[];
  offlineActivity: string;
  differentiatedSupport: {
    supportNeeded: string;
    standard: string;
    advanced: string;
  };
  observationCriteria: string;
  safetyNotes: string;
  wrapUp?: string;
  createdAt: string;
  status: 'draft' | 'approved';
}

export interface StorySection {
  order: number;
  content: string;
  speechNarration: string;
  illustrationIdea?: string;
  comprehensionQuestion?: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  moralLesson: string;
  sections: StorySection[];
  createdAt: string;
  author: string;
}

export interface ObservationRecord {
  id: string;
  date: string;
  childCode: string; // e.g. "Bé A (Minh họa)", "Bé B (Minh họa)"
  activityName: string;
  participation: 'Tích cực' | 'Trung bình' | 'Cần khích lệ';
  languageBehavior: string;
  cognitionBehavior: string;
  independenceBehavior: string;
  socialBehavior: string;
  supportNotes: string;
  teacherNote?: string;
  createdAt: string;
}

export interface TeacherProfile {
  name: string;
  school: string;
  location: string;
  quote: string;
  avatarUrl: string;
  customUploaded: boolean;
}

export interface AudioSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  autoPlayQuestion: boolean;
  preferredVoice: string;
}

export type ViewTab = 
  | 'home'
  | 'games'
  | 'learn'
  | 'teacher_ai'
  | 'library'
  | 'dien_bien'
  | 'observation'
  | 'portfolio';
