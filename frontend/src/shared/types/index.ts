export type AnswerMode = 'speaking' | 'writing' | 'translate' | 'keyword';
export type OPIcLevel = 'NL' | 'NM' | 'NH' | 'IL' | 'IM1' | 'IM2' | 'IM3' | 'IH' | 'AL';
export type SelfAssessmentLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type QuestionType = 'survey' | 'unexpected' | 'roleplay';
export type DifficultyAdjustment = 'easier' | 'same' | 'harder';

export type Occupation =
  | 'university'
  | 'graduate'
  | 'worker'
  | 'jobseeker'
  | 'housewife'
  | 'other';

export type LivingType =
  | 'alone'
  | 'family'
  | 'roommate'
  | 'dormitory';

export interface SurveyData {
  occupation: Occupation;
  livingType: LivingType;
  leisureActivities: string[];
  hobbies: string[];
  sports: string[];
  vacations: string[];
  selfAssessment: SelfAssessmentLevel;
  answerMode: AnswerMode;
}

export interface ActivityItem {
  id: string;
  label: string;
  emoji: string;
}

export interface Question {
  id: string;
  text: string;
  textKo: string;
  topicId: string;
  tips: string[];
  type: QuestionType;
}

export interface AnswerRecord {
  question: Question;
  answer: string;
  feedback?: FeedbackResult;
}

// Stored in localStorage: opic_session_state
export interface SessionState {
  questions1: Question[];           // 7 questions for session 1
  questions2: Question[] | null;    // 5 questions for session 2 (generated after readjust)
  currentSession: 1 | 2;
  currentIdx: number;               // 0-based within current session
  difficultyAdjustment: DifficultyAdjustment | null;
  surveyData: SurveyData;
  answers: AnswerRecord[];          // all submitted Q&A with optional feedback
}

export interface PracticeSession {
  question: Question;
  surveyData: SurveyData;
  answer: string;
  timestamp: number;
}

export interface FeedbackResult {
  score: number;
  level: OPIcLevel;
  strengths: string[];
  improvements: string[];
  sampleAnswer: string;
}
