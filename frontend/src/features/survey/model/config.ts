import type { AnswerMode, Occupation, LivingType, SelfAssessmentLevel } from '@/shared/types';

export const occupations: { id: Occupation; label: string; emoji: string }[] = [
  { id: 'university', label: '대학교 재학 중', emoji: '🎓' },
  { id: 'graduate', label: '대학원 재학 중', emoji: '🔬' },
  { id: 'worker', label: '직장인', emoji: '💼' },
  { id: 'jobseeker', label: '취업 준비 중', emoji: '📋' },
  { id: 'housewife', label: '주부', emoji: '🏡' },
  { id: 'other', label: '기타 (해당 없음)', emoji: '🙂' },
];

export const livingTypes: { id: LivingType; label: string; emoji: string }[] = [
  { id: 'alone', label: '개인 주택/아파트 (혼자 거주)', emoji: '🛋️' },
  { id: 'family', label: '개인 주택/아파트 (가족과 함께 거주)', emoji: '👨‍👩‍👧' },
  { id: 'roommate', label: '친구/룸메이트와 함께 거주', emoji: '🤝' },
  { id: 'dormitory', label: '기숙사에 거주', emoji: '🏢' },
];

export const selfAssessments: {
  level: SelfAssessmentLevel;
  title: string;
  desc: string;
  expect: string;
}[] = [
  {
    level: 1,
    title: '입문',
    desc: '단어나 짧은 구만 나열할 수 있고, 실질적인 대화는 거의 불가능한 수준',
    expect: 'NL - NM 목표',
  },
  {
    level: 2,
    title: '초급',
    desc: '외운 문장·짧은 표현으로 간신히 의사를 전달하는 수준',
    expect: 'NM – IL 목표',
  },
  {
    level: 3,
    title: '중급',
    desc: '간단한 질문에 답하거나 기본적인 일상 소재를 짧은 문장으로 말할 수 있는 수준',
    expect: 'IL – IM1 목표',
  },
  {
    level: 4,
    title: '중상급',
    desc: '대부분의 일상 대화를 처리하고 익숙한 주제에서 어느 정도 길게 이야기할 수 있는 수준',
    expect: 'IM2 – IM3 목표',
  },
  {
    level: 5,
    title: '상급',
    desc: '다양한 주제에서 편안하게 대화하고 복잡한 상황도 어느 정도 처리할 수 있는 수준',
    expect: 'IM3 – AL 목표',
  },
  {
    level: 6,
    title: '고급',
    desc: '대부분의 사회적·직업적 상황에서 효과적으로 소통하고 의견을 제시·토론할 수 있는 수준',
    expect: 'AL 목표',
  },
];

export const answerModes: { mode: AnswerMode; emoji: string; title: string; desc: string }[] = [
  { mode: 'speaking', emoji: '🎤', title: '말하기', desc: '마이크로 말하면 음성을 텍스트로 변환' },
  { mode: 'writing', emoji: '✍️', title: '쓰기', desc: '직접 영어로 타이핑해서 답변 작성' },
  { mode: 'translate', emoji: '🇰🇷', title: '한→영 번역', desc: '한국어로 쓰면 AI가 영어로 번역' },
  { mode: 'keyword', emoji: '🔑', title: '키워드', desc: '키워드만 입력하면 AI가 문장으로 완성' },
];

export const STEP_LABELS = [
  '현재 상황',
  '거주 형태',
  '여가 활동',
  '취미·관심사',
  '운동',
  '휴가·출장',
  '자가 평가',
  '답변 방식',
] as const;
