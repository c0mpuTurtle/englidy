import type { ActivityItem, Question, SurveyData, DifficultyAdjustment } from '@/shared/types';

type RawQ = Omit<Question, 'type'>;

// ─── 여가 활동 (10개) ─────────────────────────────────────────────────────────
export const leisureItems: ActivityItem[] = [
  { id: 'movie',            label: '영화 보기',          emoji: '🎬' },
  { id: 'club',             label: '클럽/나이트클럽 가기', emoji: '🎵' },
  { id: 'performance',      label: '공연 보기',           emoji: '🎭' },
  { id: 'concert',          label: '콘서트 보기',         emoji: '🎤' },
  { id: 'museum',           label: '박물관 가기',         emoji: '🏛️' },
  { id: 'park',             label: '공원 가기',           emoji: '🌳' },
  { id: 'camping',          label: '캠핑하기',            emoji: '⛺' },
  { id: 'beach',            label: '해변 가기',           emoji: '🏖️' },
  { id: 'sports_watching',  label: '스포츠 관람',         emoji: '🏟️' },
  { id: 'home_improvement', label: '주거 개선',           emoji: '🔨' },
];

// ─── 취미나 관심사 (9개) ──────────────────────────────────────────────────────
export const hobbyItems: ActivityItem[] = [
  { id: 'reading_kids', label: '아이에게 책 읽어주기',         emoji: '📖' },
  { id: 'music',        label: '음악 감상하기',               emoji: '🎧' },
  { id: 'instrument',   label: '악기 연주하기',               emoji: '🎸' },
  { id: 'singing',      label: '노래 부르기 / 합창',           emoji: '🎙️' },
  { id: 'dancing',      label: '춤추기',                     emoji: '💃' },
  { id: 'writing',      label: '글쓰기 (편지, 단문, 시 등)',   emoji: '✍️' },
  { id: 'drawing',      label: '그림 그리기',                 emoji: '🎨' },
  { id: 'cooking',      label: '요리하기',                   emoji: '🍳' },
  { id: 'pets',         label: '애완동물 기르기',              emoji: '🐾' },
];

// ─── 운동 (22개) ──────────────────────────────────────────────────────────────
export const sportItems: ActivityItem[] = [
  { id: 'basketball',       label: '농구',             emoji: '🏀' },
  { id: 'baseball',         label: '야구/소프트볼',     emoji: '⚾' },
  { id: 'soccer',           label: '축구',             emoji: '⚽' },
  { id: 'american_football',label: '미식축구',          emoji: '🏈' },
  { id: 'hockey',           label: '하키',             emoji: '🏒' },
  { id: 'cricket',          label: '크리켓',            emoji: '🏏' },
  { id: 'golf',             label: '골프',             emoji: '⛳' },
  { id: 'volleyball',       label: '배구',             emoji: '🏐' },
  { id: 'tennis',           label: '테니스',            emoji: '🎾' },
  { id: 'badminton',        label: '배드민턴',          emoji: '🏸' },
  { id: 'table_tennis',     label: '탁구',             emoji: '🏓' },
  { id: 'swimming',         label: '수영',             emoji: '🏊' },
  { id: 'cycling',          label: '자전거',            emoji: '🚴' },
  { id: 'skiing',           label: '스키/스노우보드',   emoji: '⛷️' },
  { id: 'ice_skating',      label: '아이스 스케이트',   emoji: '⛸️' },
  { id: 'jogging',          label: '조깅',             emoji: '🏃' },
  { id: 'walking',          label: '걷기',             emoji: '🚶' },
  { id: 'yoga',             label: '요가',             emoji: '🧘' },
  { id: 'hiking',           label: '하이킹/트래킹',     emoji: '🥾' },
  { id: 'fishing',          label: '낚시',             emoji: '🎣' },
  { id: 'gym',              label: '헬스',             emoji: '💪' },
  { id: 'no_sports',        label: '운동을 전혀 하지 않음', emoji: '🛋️' },
];

// ─── 휴가나 출장 (5개) ────────────────────────────────────────────────────────
export const vacationItems: ActivityItem[] = [
  { id: 'domestic_business',      label: '국내 출장',           emoji: '🗺️' },
  { id: 'international_business', label: '해외 출장',           emoji: '✈️' },
  { id: 'home_vacation',          label: '집에서 보내는 휴가',   emoji: '🏠' },
  { id: 'domestic_travel',        label: '국내 여행',           emoji: '🚆' },
  { id: 'international_travel',   label: '해외 여행',           emoji: '🌏' },
];

// ─── 서베이 기반 질문 뱅크 ───────────────────────────────────────────────────
const questions: Record<string, RawQ[]> = {
  university: [
    { id: 'univ_1', topicId: 'university', textKo: '학교나 대학교에 대해 말해 주세요. 어떤 모습이고 무엇으로 유명한가요?', text: 'Tell me about your school or university. What does it look like and what is it known for?', tips: ['학교 위치·규모·분위기', '전공 소개', '학교가 유명한 이유'] },
    { id: 'univ_2', topicId: 'university', textKo: '학교에서의 평범한 하루를 묘사해 주세요. 아침부터 저녁까지 보통 무엇을 하나요?', text: 'Describe a typical day at school for you. What do you usually do from morning to evening?', tips: ['수업 시간표', '방과 후 활동', '자주 가는 장소'] },
    { id: 'univ_3', topicId: 'university', textKo: '기억에 남는 수업이나 교수님에 대해 말해 주세요. 왜 기억에 남나요?', text: 'Tell me about a memorable course or professor you have had. Why do you remember them?', tips: ['어떤 수업·교수', '왜 기억에 남는지', '뭘 배웠는지'] },
  ],
  graduate: [
    { id: 'grad_1', topicId: 'graduate', textKo: '대학원 프로그램에 대해 말해 주세요. 무엇을 연구하고 왜 이 분야를 선택했나요?', text: 'Tell me about your graduate program. What do you research and why did you choose this field?', tips: ['연구 주제', '왜 대학원에 갔는지', '지도교수'] },
    { id: 'grad_2', topicId: 'graduate', textKo: '연구하는 평범한 하루를 묘사해 주세요. 보통 무엇을 하나요?', text: 'Describe a typical research day for you. What does it usually involve?', tips: ['연구실 환경', '하루 일과', '어려운 점'] },
    { id: 'grad_3', topicId: 'graduate', textKo: '대학원 공부에서 겪은 어려움과 어떻게 극복했는지 말해 주세요.', text: 'What challenges have you faced in your graduate studies and how have you dealt with them?', tips: ['어려운 점', '어떻게 극복했는지', '배운 것'] },
  ],
  worker: [
    { id: 'work_1', topicId: 'worker', textKo: '회사와 담당 업무에 대해 말해 주세요. 어떤 역할을 맡고 있나요?', text: 'Tell me about your company and what you do there. What is your role?', tips: ['회사 업종·규모', '맡은 업무', '팀 분위기'] },
    { id: 'work_2', topicId: 'worker', textKo: '평범한 업무 하루를 묘사해 주세요. 하루가 보통 어떻게 흘러가나요?', text: 'Describe a typical workday for you. What does your day usually look like?', tips: ['출근 루틴', '주요 업무 흐름', '퇴근 후'] },
    { id: 'work_3', topicId: 'worker', textKo: '직장에서 어려웠던 프로젝트나 상황에 대해 말해 주세요. 어떻게 해결했나요?', text: 'Tell me about a challenging project or situation at work. How did you handle it?', tips: ['어떤 프로젝트', '어려웠던 점', '어떻게 해결했는지'] },
  ],
  jobseeker: [
    { id: 'job_1', topicId: 'jobseeker', textKo: '취업을 위해 어떤 준비를 하고 있는지 말해 주세요. 어떤 단계를 밟고 있나요?', text: 'Tell me about what you are doing to prepare for your career. What steps are you taking?', tips: ['어떤 준비를 하는지', '공부·자격증', '목표 직업'] },
    { id: 'job_2', topicId: 'jobseeker', textKo: '어떤 직업이나 커리어를 원하나요? 왜 그 일에 관심이 있나요?', text: 'What kind of job or career are you looking for? Why does it interest you?', tips: ['원하는 직업', '그 이유', '어떤 회사를 목표로'] },
  ],
  housewife: [
    { id: 'hw_1', topicId: 'housewife', textKo: '집에서의 일반적인 일과를 묘사해 주세요. 하루 동안 주로 무엇을 하나요?', text: 'Describe your typical daily routine at home. What do you usually do throughout the day?', tips: ['아침부터 저녁 일과', '주요 집안일', '자신만의 시간'] },
    { id: 'hw_2', topicId: 'housewife', textKo: '집안을 어떻게 관리하는지 말해 주세요. 주요 역할은 무엇인가요?', text: 'Tell me about how you manage your household. What are your main responsibilities?', tips: ['주요 역할', '어떻게 관리하는지', '어려운 점'] },
  ],
  alone: [
    { id: 'alone_1', topicId: 'alone', textKo: '현재 사는 집을 묘사해 주세요. 내부는 어떻게 생겼고 무엇이 마음에 드나요?', text: 'Describe the place where you currently live. What does it look like inside and what do you like about it?', tips: ['집 구조·인테리어', '좋아하는 공간', '분위기'] },
    { id: 'alone_2', topicId: 'alone', textKo: '혼자 사는 것의 가장 좋은 점은 무엇인가요? 단점도 있나요?', text: 'What do you like most about living alone? Are there any downsides?', tips: ['혼자 사는 장점', '단점·불편한 점', '어떻게 해결'] },
  ],
  family: [
    { id: 'fam_1', topicId: 'family', textKo: '사는 집과 동네에 대해 묘사해 주세요. 어떤 모습인가요?', text: 'Describe your home and neighborhood. What are they like?', tips: ['집 구조', '동네 분위기', '주변 시설'] },
    { id: 'fam_2', topicId: 'family', textKo: '가족과 함께하는 집에서의 일상생활에 대해 말해 주세요. 보통 무엇을 함께 하나요?', text: 'Tell me about your daily life at home with your family. What do you usually do together?', tips: ['가족과 하는 활동', '식사 시간', '주말 루틴'] },
  ],
  roommate: [
    { id: 'room_1', topicId: 'roommate', textKo: '현재 주거 상황에 대해 말해 주세요. 누구와 함께 살고 있고 어떻게 같이 살게 됐나요?', text: 'Tell me about your living situation. Who do you live with and how did you end up living together?', tips: ['룸메이트 소개', '어떻게 같이 살게 됐는지', '함께 사는 규칙'] },
    { id: 'room_2', topicId: 'roommate', textKo: '룸메이트와 함께 사는 것의 장점과 단점은 무엇인가요?', text: 'What are the advantages and disadvantages of living with a roommate?', tips: ['장점', '단점', '어떻게 잘 지내는지'] },
  ],
  dormitory: [
    { id: 'dorm_1', topicId: 'dormitory', textKo: '기숙사와 그곳에서의 생활을 묘사해 주세요. 좋은 점과 싫은 점은 무엇인가요?', text: 'Describe your dormitory and what life there is like. What do you like or dislike about it?', tips: ['기숙사 환경', '룸메이트', '장단점'] },
    { id: 'dorm_2', topicId: 'dormitory', textKo: '기숙사 생활에서 기억에 남는 경험이나 어려움에 대해 말해 주세요.', text: 'Tell me about a memorable experience or challenge you have had living in a dormitory.', tips: ['어떤 경험이었는지', '어떻게 됐는지', '뭘 배웠는지'] },
  ],
  movie: [
    { id: 'movie_1', topicId: 'movie', textKo: '최근에 본 영화에 대해 말해 주세요. 어떤 내용이었고 어떻게 느꼈나요?', text: 'Tell me about a movie you have watched recently. What was it about and what did you think of it?', tips: ['제목·장르', '어떤 내용인지', '어떻게 느꼈는지'] },
    { id: 'movie_2', topicId: 'movie', textKo: '좋아하는 영화관을 묘사해 주세요. 그곳에 가는 것의 어떤 점이 좋은가요?', text: 'Describe your favorite movie theater or cinema. What do you like about going there?', tips: ['어떤 영화관인지', '시설·분위기', '왜 좋아하는지'] },
    { id: 'movie_3', topicId: 'movie', textKo: '집에서 영화 보기와 극장 가기를 비교해 주세요. 어느 쪽을 더 좋아하고 왜 그런가요?', text: 'Compare watching movies at home with going to the cinema. Which do you prefer and why?', tips: ['집 vs 영화관 차이', '각각의 장단점', '자신의 선호'] },
  ],
  club: [
    { id: 'club_1', topicId: 'club', textKo: '자주 가는 클럽이나 바에 대해 말해 주세요. 어떤 곳이고 거기서 무엇을 하나요?', text: 'Tell me about a club or bar you enjoy going to. What is it like and what do you do there?', tips: ['어떤 곳인지', '분위기·음악', '자주 가는지'] },
    { id: 'club_2', topicId: 'club', textKo: '클럽이나 바에서 기억에 남는 밤 외출을 묘사해 주세요. 어떤 일이 있었나요?', text: 'Describe a memorable night out at a club or bar. What happened?', tips: ['언제였는지', '누구와 함께', '왜 기억에 남는지'] },
  ],
  performance: [
    { id: 'perf_1', topicId: 'performance', textKo: '최근에 관람한 공연에 대해 말해 주세요. 어떤 공연이었고 어땠나요?', text: 'Tell me about a performance you have attended recently. What was it and what was it like?', tips: ['어떤 공연이었는지', '어디서 봤는지', '어떻게 느꼈는지'] },
    { id: 'perf_2', topicId: 'performance', textKo: '가장 좋아하는 공연 종류를 묘사해 주세요. 왜 그런 유형을 좋아하나요?', text: 'Describe the kind of performances you enjoy most. Why do you like this type?', tips: ['좋아하는 공연 종류', '특징', '왜 좋아하는지'] },
  ],
  concert: [
    { id: 'concert_1', topicId: 'concert', textKo: '가봤던 콘서트에 대해 말해 주세요. 어땠고 가장 좋았던 점은 무엇인가요?', text: 'Tell me about a concert you have been to. What was it like and what did you enjoy most?', tips: ['어떤 콘서트', '분위기', '가장 좋았던 점'] },
    { id: 'concert_2', topicId: 'concert', textKo: '이상적인 콘서트 경험을 묘사해 주세요. 어떤 모습일까요?', text: 'Describe your ideal concert experience. What would it be like?', tips: ['좋아하는 아티스트', '이상적인 장소', '같이 갈 사람'] },
  ],
  museum: [
    { id: 'museum_1', topicId: 'museum', textKo: '방문했던 박물관에 대해 말해 주세요. 어떤 박물관이었고 무엇을 봤나요?', text: 'Tell me about a museum you have visited. What kind of museum was it and what did you see there?', tips: ['어떤 박물관인지', '어떤 전시물', '인상 깊었던 것'] },
    { id: 'museum_2', topicId: 'museum', textKo: '가장 좋아하는 박물관 유형을 묘사해 주세요. 박물관 방문을 왜 좋아하나요?', text: 'Describe your favorite type of museum. Why do you enjoy visiting museums?', tips: ['좋아하는 박물관 종류', '왜 좋아하는지', '얼마나 자주 가는지'] },
  ],
  park: [
    { id: 'park_1', topicId: 'park', textKo: '자주 가는 공원에 대해 말해 주세요. 거기서 보통 무엇을 하나요?', text: 'Tell me about a park you enjoy visiting. What do you usually do there?', tips: ['어떤 공원인지', '주로 뭘 하는지', '왜 좋아하는지'] },
    { id: 'park_2', topicId: 'park', textKo: '공원에서 있었던 기억에 남는 경험을 묘사해 주세요.', text: 'Describe a memorable experience you have had at a park.', tips: ['언제였는지', '누구와 함께', '어떤 일이 있었는지'] },
  ],
  camping: [
    { id: 'camp_1', topicId: 'camping', textKo: '가봤던 캠핑 여행에 대해 말해 주세요. 어디로 갔고 무엇을 했나요?', text: 'Tell me about a camping trip you have been on. Where did you go and what did you do?', tips: ['어디로 갔는지', '누구와 함께', '뭘 했는지'] },
    { id: 'camp_2', topicId: 'camping', textKo: '캠핑 가기 전에 무엇을 준비해야 하는지 묘사해 주세요. 보통 무엇을 가져가나요?', text: 'Describe what you need to prepare before going camping. What do you usually bring?', tips: ['필요한 준비물', '준비 과정', '가장 중요한 것'] },
  ],
  beach: [
    { id: 'beach_1', topicId: 'beach', textKo: '가봤던 해변에 대해 말해 주세요. 어땠고 거기서 무엇을 했나요?', text: 'Tell me about a beach you have visited. What was it like and what did you do there?', tips: ['어떤 해변인지', '뭘 했는지', '어땠는지'] },
    { id: 'beach_2', topicId: 'beach', textKo: '이상적인 해변에서의 하루를 묘사해 주세요. 아침부터 저녁까지 무엇을 할 건가요?', text: 'Describe your ideal beach day. What would you do from morning to evening?', tips: ['아침부터 저녁 일정', '같이 갈 사람', '꼭 하고 싶은 것'] },
  ],
  sports_watching: [
    { id: 'sw_1', topicId: 'sports_watching', textKo: '가장 즐겨 관람하는 스포츠에 대해 말해 주세요. 왜 그 스포츠 보는 것을 좋아하나요?', text: 'Tell me about your favorite sport to watch. Why do you enjoy watching it?', tips: ['어떤 스포츠', '왜 좋아하는지', '어디서 보는지'] },
    { id: 'sw_2', topicId: 'sports_watching', textKo: '관람했던 기억에 남는 스포츠 경기를 묘사해 주세요. 무엇이 그것을 흥미롭게 만들었나요?', text: 'Describe a memorable sporting event you have watched. What made it exciting?', tips: ['어떤 경기였는지', '어떤 일이 있었는지', '왜 기억에 남는지'] },
  ],
  home_improvement: [
    { id: 'hi_1', topicId: 'home_improvement', textKo: '집 수리 또는 개선 프로젝트에 대해 말해 주세요. 무엇을 바꿨고 왜 그랬나요?', text: 'Tell me about a home improvement project you have done. What did you change and why?', tips: ['어떤 작업이었는지', '왜 했는지', '결과는'] },
    { id: 'hi_2', topicId: 'home_improvement', textKo: '기회가 된다면 집에서 바꾸고 싶은 것들을 묘사해 주세요.', text: 'Describe the changes you would like to make to your home if you had the chance.', tips: ['어떤 부분을 바꾸고 싶은지', '왜 그렇게 생각하는지', '어떤 효과 기대'] },
  ],
  reading_kids: [
    { id: 'rk_1', topicId: 'reading_kids', textKo: '아이에게 읽어주는 책의 종류에 대해 말해 주세요. 아이가 좋아하는 책은 무엇인가요?', text: 'Tell me about the kinds of books you read to children. What are some of their favorites?', tips: ['좋아하는 책 종류', '어떤 내용인지', '아이 반응'] },
    { id: 'rk_2', topicId: 'reading_kids', textKo: '아이와의 독서 루틴을 묘사해 주세요. 보통 언제, 어디서 읽어주나요?', text: 'Describe your reading routine with children. When and where do you usually do it?', tips: ['언제 읽어주는지', '어떤 환경인지', '얼마나 오래'] },
  ],
  music: [
    { id: 'music_1', topicId: 'music', textKo: '즐겨 듣는 음악 장르에 대해 말해 주세요. 무엇이 좋은가요?', text: 'Tell me about the type of music you enjoy listening to. What do you like about it?', tips: ['좋아하는 장르', '언제 듣는지', '왜 좋아하는지'] },
    { id: 'music_2', topicId: 'music', textKo: '특별한 의미가 있는 노래나 앨범을 묘사해 주세요. 왜 의미 있나요?', text: 'Describe a song or album that is special to you. Why is it meaningful?', tips: ['어떤 노래·앨범인지', '왜 특별한지', '어떤 추억이 있는지'] },
    { id: 'music_3', topicId: 'music', textKo: '음악 취향이 세월이 흐르면서 어떻게 바뀌었나요? 예전과 지금을 비교해 주세요.', text: 'How has your taste in music changed over the years? What do you listen to now compared to before?', tips: ['어릴 때 vs 지금', '어떻게 바뀌었는지', '계기가 있었는지'] },
  ],
  instrument: [
    { id: 'inst_1', topicId: 'instrument', textKo: '연주하는 악기에 대해 말해 주세요. 어떻게 배우기 시작했나요?', text: 'Tell me about the instrument you play. How did you get started learning it?', tips: ['어떤 악기인지', '어떻게 시작했는지', '언제부터'] },
    { id: 'inst_2', topicId: 'instrument', textKo: '연습 루틴을 묘사해 주세요. 얼마나 자주 연습하고 무엇을 주로 연습하나요?', text: 'Describe your practice routine. How often do you practice and what do you usually work on?', tips: ['얼마나 자주', '어떤 연습', '어떻게 발전했는지'] },
  ],
  singing: [
    { id: 'sing_1', topicId: 'singing', textKo: '노래 경험에 대해 말해 주세요. 혼자, 합창, 아니면 다른 형태로 노래하나요?', text: 'Tell me about your experience with singing. Do you sing alone, with a choir, or in another setting?', tips: ['어떤 형태로 노래하는지', '언제·어디서', '얼마나 자주'] },
    { id: 'sing_2', topicId: 'singing', textKo: '기억에 남는 노래 경험을 묘사해 주세요. 무엇이 특별하게 만들었나요?', text: 'Describe a memorable singing experience you have had. What made it special?', tips: ['어떤 경험이었는지', '어떻게 느꼈는지', '왜 기억에 남는지'] },
  ],
  dancing: [
    { id: 'dance_1', topicId: 'dancing', textKo: '어떻게 춤을 시작했는지 말해 주세요. 어떤 스타일을 가장 좋아하나요?', text: 'Tell me about how you got into dancing. What style do you enjoy most?', tips: ['어떻게 시작했는지', '어떤 스타일인지', '왜 좋아하는지'] },
    { id: 'dance_2', topicId: 'dancing', textKo: '일반적인 댄스 세션이나 수업을 묘사해 주세요. 무엇을 하나요?', text: 'Describe a typical dance session or class for you. What does it involve?', tips: ['어떤 환경인지', '무엇을 연습하는지', '얼마나 오래'] },
  ],
  writing: [
    { id: 'writ_1', topicId: 'writing', textKo: '글쓰기 습관에 대해 말해 주세요. 보통 무엇을 쓰고 언제 쓰나요?', text: 'Tell me about your writing habit. What do you usually write and when?', tips: ['뭘 쓰는지', '언제 쓰는지', '왜 쓰는지'] },
    { id: 'writ_2', topicId: 'writing', textKo: '자랑스럽게 생각하는 글을 묘사해 주세요. 어떤 내용이었고 무엇이 좋았나요?', text: 'Describe a piece of writing you are proud of. What was it about and what made it good?', tips: ['어떤 글이었는지', '어떻게 썼는지', '왜 뿌듯한지'] },
  ],
  drawing: [
    { id: 'draw_1', topicId: 'drawing', textKo: '그림이나 미술에 대한 관심을 말해 주세요. 보통 무엇을 그리고 어떤 스타일을 좋아하나요?', text: 'Tell me about your interest in drawing or art. What do you usually draw and what style do you prefer?', tips: ['어떤 그림을 그리는지', '스타일', '도구·재료'] },
    { id: 'draw_2', topicId: 'drawing', textKo: '그림을 어떻게 배웠는지 묘사해 주세요. 수업을 들었나요, 독학했나요?', text: 'Describe how you learned to draw. Did you take classes or are you self-taught?', tips: ['어떻게 배웠는지', '독학 vs 수업', '어떻게 발전했는지'] },
  ],
  cooking: [
    { id: 'cook_1', topicId: 'cooking', textKo: '즐겨 요리하는 음식에 대해 말해 주세요. 어떻게 만들고 언제 주로 만드나요?', text: 'Tell me about a dish you enjoy cooking. How do you make it and when do you usually make it?', tips: ['어떤 음식인지', '재료와 과정', '언제 주로 만드는지'] },
    { id: 'cook_2', topicId: 'cooking', textKo: '새롭거나 어려운 음식 요리에 도전했던 때를 묘사해 주세요. 어떻게 됐나요?', text: 'Describe a time when you tried cooking something new or challenging. How did it turn out?', tips: ['언제·왜 도전했는지', '어떻게 됐는지', '뭘 배웠는지'] },
  ],
  pets: [
    { id: 'pet_1', topicId: 'pets', textKo: '반려동물에 대해 말해 주세요. 어떤 동물이고 성격은 어떤가요?', text: 'Tell me about your pet. What kind of animal do you have and what is its personality like?', tips: ['어떤 동물인지', '이름·나이', '성격·특징'] },
    { id: 'pet_2', topicId: 'pets', textKo: '반려동물과의 하루 일과를 묘사해 주세요. 함께 무엇을 하나요?', text: 'Describe your daily routine with your pet. What do you do together?', tips: ['하루 일과', '함께 하는 활동', '가장 좋아하는 시간'] },
  ],
  basketball: [
    { id: 'bball_1', topicId: 'basketball', textKo: '농구 경험에 대해 말해 주세요. 어떻게 시작했고 얼마나 자주 하나요?', text: 'Tell me about your basketball experience. How did you get into it and how often do you play?', tips: ['어떻게 시작했는지', '얼마나 자주', '누구와 함께'] },
    { id: 'bball_2', topicId: 'basketball', textKo: '기억에 남는 농구 경기를 묘사해 주세요. 어떤 일이 있었나요?', text: 'Describe a memorable basketball game you have played. What happened?', tips: ['어떤 경기였는지', '어떻게 됐는지', '왜 기억에 남는지'] },
  ],
  baseball: [
    { id: 'base_1', topicId: 'baseball', textKo: '야구나 소프트볼 경험에 대해 말해 주세요. 얼마나 자주, 어디서 하나요?', text: 'Tell me about your baseball or softball experience. How often do you play and where?', tips: ['어디서 하는지', '얼마나 자주', '어떤 포지션'] },
    { id: 'base_2', topicId: 'baseball', textKo: '기억에 남는 경기를 묘사해 주세요. 무엇이 그것을 흥미롭게 만들었나요?', text: 'Describe a memorable game you have played or watched. What made it exciting?', tips: ['어떤 경기', '어떻게 됐는지', '왜 기억에 남는지'] },
  ],
  soccer: [
    { id: 'soccer_1', topicId: 'soccer', textKo: '축구 경험에 대해 말해 주세요. 어떻게 시작했고 얼마나 자주 하나요?', text: 'Tell me about your soccer experience. How did you get started and how often do you play?', tips: ['어떻게 시작했는지', '얼마나 자주', '어떤 팀인지'] },
    { id: 'soccer_2', topicId: 'soccer', textKo: '기억에 남는 축구 경기를 묘사해 주세요. 어떤 일이 있었나요?', text: 'Describe a memorable soccer match you have played. What happened?', tips: ['어떤 경기였는지', '어떻게 됐는지', '왜 기억에 남는지'] },
  ],
  american_football: [
    { id: 'amfoot_1', topicId: 'american_football', textKo: '미식축구 경험에 대해 말해 주세요. 어떻게 시작했나요?', text: 'Tell me about your experience with American football. How did you get into it?', tips: ['어떻게 시작했는지', '얼마나 자주', '어디서 하는지'] },
  ],
  hockey: [
    { id: 'hockey_1', topicId: 'hockey', textKo: '하키 경험에 대해 말해 주세요. 어떻게 시작했고 무엇이 즐거운가요?', text: 'Tell me about your hockey experience. How did you get started and what do you enjoy about it?', tips: ['어떻게 시작했는지', '왜 좋아하는지', '어디서 하는지'] },
  ],
  cricket: [
    { id: 'cricket_1', topicId: 'cricket', textKo: '크리켓 경험에 대해 말해 주세요. 어떻게 시작했고 얼마나 자주 하나요?', text: 'Tell me about your cricket experience. How did you get into it and how often do you play?', tips: ['어떻게 시작했는지', '얼마나 자주', '어디서 하는지'] },
  ],
  golf: [
    { id: 'golf_1', topicId: 'golf', textKo: '골프 경험에 대해 말해 주세요. 어떻게 시작했고 얼마나 자주 치나요?', text: 'Tell me about your golf experience. How did you get started and how often do you play?', tips: ['어떻게 시작했는지', '얼마나 자주', '어느 골프장'] },
    { id: 'golf_2', topicId: 'golf', textKo: '기억에 남는 라운드를 묘사해 주세요. 어떤 경험이었나요?', text: 'Describe a memorable round of golf you have played. What was the experience like?', tips: ['어느 코스', '어떤 일이 있었는지', '스코어는'] },
  ],
  volleyball: [
    { id: 'vball_1', topicId: 'volleyball', textKo: '배구 경험에 대해 말해 주세요. 보통 어디서 누구와 하나요?', text: 'Tell me about your volleyball experience. Where do you usually play and with whom?', tips: ['어디서 하는지', '누구와 함께', '어떤 형식으로'] },
  ],
  tennis: [
    { id: 'tennis_1', topicId: 'tennis', textKo: '테니스 경험에 대해 말해 주세요. 어떻게 배웠고 지금은 얼마나 자주 하나요?', text: 'Tell me about your tennis experience. How did you learn to play and how often do you play now?', tips: ['어떻게 배웠는지', '얼마나 자주', '어느 코트'] },
    { id: 'tennis_2', topicId: 'tennis', textKo: '기억에 남는 테니스 경기나 레슨을 묘사해 주세요.', text: 'Describe a memorable tennis match or lesson you have had.', tips: ['어떤 경기·레슨이었는지', '왜 기억에 남는지', '뭘 배웠는지'] },
  ],
  badminton: [
    { id: 'bad_1', topicId: 'badminton', textKo: '배드민턴 습관에 대해 말해 주세요. 보통 어디서 얼마나 자주 하나요?', text: 'Tell me about your badminton habits. Where do you usually play and how often?', tips: ['어디서 하는지', '얼마나 자주', '누구와 함께'] },
    { id: 'bad_2', topicId: 'badminton', textKo: '특히 잘됐거나 치열했던 배드민턴 경기를 묘사해 주세요.', text: 'Describe a time when you played a particularly good or competitive game of badminton.', tips: ['어떤 경기였는지', '어떻게 됐는지', '어땠는지'] },
  ],
  table_tennis: [
    { id: 'tt_1', topicId: 'table_tennis', textKo: '탁구 경험에 대해 말해 주세요. 얼마나 자주, 어디서 하나요?', text: 'Tell me about your table tennis experience. How often do you play and where?', tips: ['어디서 하는지', '얼마나 자주', '어느 수준인지'] },
  ],
  swimming: [
    { id: 'swim_1', topicId: 'swimming', textKo: '수영 습관에 대해 말해 주세요. 어디서 얼마나 자주 수영하나요?', text: 'Tell me about your swimming habits. Where do you swim and how often?', tips: ['어디서 수영하는지', '얼마나 자주', '주로 어떤 영법'] },
    { id: 'swim_2', topicId: 'swimming', textKo: '수영을 어떻게 배웠는지 묘사해 주세요. 언제 시작했고 처음에는 어땠나요?', text: 'Describe how you learned to swim. When did you start and what was it like at first?', tips: ['언제·어떻게 배웠는지', '처음에 어려웠는지', '어떻게 발전했는지'] },
  ],
  cycling: [
    { id: 'cyc_1', topicId: 'cycling', textKo: '자전거 타기 습관에 대해 말해 주세요. 보통 어디서 얼마나 오래 타나요?', text: 'Tell me about your cycling habits. Where do you usually ride and how far do you go?', tips: ['어디서 타는지', '어떤 경로', '얼마나 자주'] },
    { id: 'cyc_2', topicId: 'cycling', textKo: '기억에 남는 자전거 여행을 묘사해 주세요. 어디로 갔고 어떤 경험이었나요?', text: 'Describe a memorable bike ride you have taken. Where did you go and what was it like?', tips: ['어디로 갔는지', '누구와 함께', '어떤 경험이었는지'] },
  ],
  skiing: [
    { id: 'ski_1', topicId: 'skiing', textKo: '스키나 스노우보드 경험에 대해 말해 주세요. 어떻게 시작했고 얼마나 자주 가나요?', text: 'Tell me about your skiing or snowboarding experience. How did you get into it and how often do you go?', tips: ['어떻게 시작했는지', '어디서 타는지', '얼마나 자주'] },
    { id: 'ski_2', topicId: 'skiing', textKo: '기억에 남는 스키 여행을 묘사해 주세요. 어디로 갔고 무엇을 했나요?', text: 'Describe a memorable ski trip you have taken. Where did you go and what did you do?', tips: ['어디로 갔는지', '누구와 함께', '어떤 경험이었는지'] },
  ],
  ice_skating: [
    { id: 'is_1', topicId: 'ice_skating', textKo: '아이스 스케이트 경험에 대해 말해 주세요. 어떻게 배웠고 지금은 얼마나 자주 타나요?', text: 'Tell me about your ice skating experience. How did you learn and how often do you skate now?', tips: ['어떻게 배웠는지', '어디서 타는지', '얼마나 자주'] },
  ],
  jogging: [
    { id: 'jog_1', topicId: 'jogging', textKo: '조깅 루틴에 대해 말해 주세요. 어디서 뛰고, 얼마나 멀리, 얼마나 자주 하나요?', text: 'Tell me about your jogging routine. Where do you run, how far, and how often?', tips: ['언제·어디서', '얼마나 자주', '얼마나 오래'] },
    { id: 'jog_2', topicId: 'jogging', textKo: '처음 조깅을 시작했을 때를 묘사해 주세요. 무엇이 동기가 됐나요?', text: 'Describe how you first started jogging. What motivated you to begin?', tips: ['시작한 계기', '처음에 어땠는지', '지금과의 차이'] },
  ],
  walking: [
    { id: 'walk_1', topicId: 'walking', textKo: '걷기 루틴에 대해 말해 주세요. 어디로 가고 얼마나 자주 하나요?', text: 'Tell me about your walking routine. Where do you go and how often?', tips: ['어디서 걷는지', '얼마나 자주·오래', '걷는 이유'] },
    { id: 'walk_2', topicId: 'walking', textKo: '기억에 남는 산책을 묘사해 주세요. 무엇이 특별하게 만들었나요?', text: 'Describe a memorable walk you have taken. What made it special?', tips: ['어디를 걸었는지', '왜 기억에 남는지', '어떤 느낌이었는지'] },
  ],
  yoga: [
    { id: 'yoga_1', topicId: 'yoga', textKo: '요가를 어떻게 시작했고 어떤 도움이 됐는지 말해 주세요.', text: 'Tell me about your yoga practice. How did you get started and how has it helped you?', tips: ['어떻게 시작했는지', '어디서 하는지', '어떤 효과'] },
    { id: 'yoga_2', topicId: 'yoga', textKo: '일반적인 요가 세션을 묘사해 주세요. 처음부터 끝까지 보통 무엇을 하나요?', text: 'Describe a typical yoga session for you. What do you usually do from start to finish?', tips: ['얼마나 오래', '어떤 동작들', '어떤 느낌인지'] },
  ],
  hiking: [
    { id: 'hike_1', topicId: 'hiking', textKo: '하이킹 습관에 대해 말해 주세요. 보통 어디서 얼마나 자주 하나요?', text: 'Tell me about your hiking habits. Where do you usually hike and how often?', tips: ['주로 어느 산', '얼마나 자주', '누구와 함께'] },
    { id: 'hike_2', topicId: 'hiking', textKo: '기억에 남는 하이킹 여행을 묘사해 주세요. 어떤 경험이었나요?', text: 'Describe a memorable hiking trip you have taken. What was the experience like?', tips: ['어떤 산이었는지', '어떤 경험이었는지', '왜 기억에 남는지'] },
  ],
  fishing: [
    { id: 'fish_1', topicId: 'fishing', textKo: '낚시 습관에 대해 말해 주세요. 보통 어디서 무엇을 잡나요?', text: 'Tell me about your fishing habits. Where do you usually go and what do you catch?', tips: ['어디서 낚시하는지', '어떤 물고기', '누구와 함께'] },
    { id: 'fish_2', topicId: 'fishing', textKo: '기억에 남는 낚시 여행을 묘사해 주세요. 어떤 일이 있었고 무엇을 잡았나요?', text: 'Describe a memorable fishing trip. What happened and what did you catch?', tips: ['어디로 갔는지', '어떤 일이 있었는지', '왜 기억에 남는지'] },
  ],
  gym: [
    { id: 'gym_1', topicId: 'gym', textKo: '헬스장 운동 루틴에 대해 말해 주세요. 보통 어떤 운동을 하나요?', text: 'Tell me about your workout routine at the gym. What exercises do you usually do?', tips: ['주로 어떤 운동인지', '얼마나 자주·오래', '루틴 흐름'] },
    { id: 'gym_2', topicId: 'gym', textKo: '다니는 헬스장을 묘사해 주세요. 어떤 모습이고 어떤 시설이 있나요?', text: 'Describe the gym where you work out. What is it like and what facilities does it have?', tips: ['어떤 시설인지', '어디 있는지', '어떤 장비'] },
    { id: 'gym_3', topicId: 'gym', textKo: '처음 운동을 시작하게 된 계기를 말해 주세요. 무엇이 동기가 됐나요?', text: 'Tell me about how you first got into working out. What motivated you to start?', tips: ['시작한 계기', '어떻게 시작했는지', '계속하는 이유'] },
  ],
  no_sports: [
    { id: 'ns_1', topicId: 'no_sports', textKo: '운동을 별로 하지 않는다고 하셨는데, 이유가 무엇인가요? 대신 건강을 어떻게 관리하나요?', text: 'You mentioned that you do not really exercise. Can you tell me why? What do you do to stay healthy instead?', tips: ['운동을 안 하는 이유', '대신 뭘 하는지', '건강을 어떻게 관리하는지'] },
    { id: 'ns_2', topicId: 'no_sports', textKo: '규칙적인 운동이 중요하다고 생각하나요? 운동을 시작할 생각을 해본 적 있나요?', text: 'Do you think regular exercise is important? Have you ever considered starting to exercise regularly?', tips: ['운동의 중요성', '시작하고 싶은지', '어떤 운동을 고려하는지'] },
  ],
  domestic_travel: [
    { id: 'dt_1', topicId: 'domestic_travel', textKo: '최근에 방문한 국내 여행지에 대해 말해 주세요. 거기서 무엇을 했나요?', text: 'Tell me about a place in your country you have visited recently. What did you do there?', tips: ['어디를 갔는지', '무엇을 했는지', '어땠는지'] },
    { id: 'dt_2', topicId: 'domestic_travel', textKo: '가장 좋아하는 국내 여행지를 묘사해 주세요. 무엇이 특별하고 왜 좋아하나요?', text: 'Describe your favorite domestic travel destination. What makes it special and why do you like it?', tips: ['어떤 곳인지', '특별한 점', '왜 좋아하는지'] },
    { id: 'dt_3', topicId: 'domestic_travel', textKo: '방문했던 국내 두 곳을 비교해 주세요. 어떤 차이가 있었나요?', text: 'Compare two different places you have visited within your country. What were the differences?', tips: ['두 장소 비교', '공통점·차이점', '어디가 더 좋았는지'] },
  ],
  international_travel: [
    { id: 'it_1', topicId: 'international_travel', textKo: '방문했던 나라에 대해 말해 주세요. 그곳에서 가장 좋았던 점은 무엇인가요?', text: 'Tell me about a country you have visited. What did you enjoy most about being there?', tips: ['어느 나라인지', '뭘 했는지', '가장 좋았던 점'] },
    { id: 'it_2', topicId: 'international_travel', textKo: '해외 여행 중 기억에 남는 경험을 묘사해 주세요. 어떤 일이 있었나요?', text: 'Describe a memorable experience you had while traveling abroad. What happened?', tips: ['어떤 경험이었는지', '왜 기억에 남는지', '어떤 느낌이었는지'] },
    { id: 'it_3', topicId: 'international_travel', textKo: '자국과 방문했던 외국을 비교해 주세요. 주요 차이점은 무엇이었나요?', text: 'Compare your home country with a foreign country you have visited. What were the main differences?', tips: ['어느 나라와 비교', '문화·음식·생활 차이', '어떻게 느꼈는지'] },
  ],
  home_vacation: [
    { id: 'hv_1', topicId: 'home_vacation', textKo: '집에서 휴가를 어떻게 즐기는지 말해 주세요. 보통 무엇을 하나요?', text: 'Tell me about how you enjoy spending vacation time at home. What do you usually do?', tips: ['주로 하는 활동', '가장 좋아하는 시간', '왜 집에서 보내는지'] },
    { id: 'hv_2', topicId: 'home_vacation', textKo: '집에서 보내는 완벽한 휴가를 묘사해 주세요. 아침부터 저녁까지 이상적인 하루는 어떤 모습인가요?', text: 'Describe a perfect vacation spent at home. What would your ideal day look like from morning to night?', tips: ['아침부터 저녁 일정', '뭘 하고 싶은지', '이상적인 하루'] },
  ],
  domestic_business: [
    { id: 'db_1', topicId: 'domestic_business', textKo: '국내 출장에 대해 말해 주세요. 어디로 갔고 목적은 무엇이었나요?', text: 'Tell me about a domestic business trip you have taken. Where did you go and what was the purpose?', tips: ['어디로 갔는지', '목적은', '어떻게 됐는지'] },
    { id: 'db_2', topicId: 'domestic_business', textKo: '일반적인 국내 출장이 어떤 모습인지 묘사해 주세요. 보통 무엇을 하나요?', text: 'Describe what a typical domestic business trip is like for you. What do you usually do?', tips: ['어떻게 준비하는지', '이동 방법', '현지에서 뭘 하는지'] },
  ],
  international_business: [
    { id: 'ib_1', topicId: 'international_business', textKo: '해외 출장에 대해 말해 주세요. 어느 나라로 갔고 목적은 무엇이었나요?', text: 'Tell me about an international business trip you have taken. Where did you go and what was the purpose?', tips: ['어느 나라로', '목적은', '어떤 경험이었는지'] },
    { id: 'ib_2', topicId: 'international_business', textKo: '해외 출장의 어려움을 묘사해 주세요. 어떻게 준비하나요?', text: 'Describe the challenges of going on international business trips. How do you prepare?', tips: ['어떤 어려움이 있는지', '어떻게 준비하는지', '문화 차이'] },
  ],
};

// ─── 돌발 주제 질문 풀 ────────────────────────────────────────────────────────
const unexpectedPool: RawQ[] = [
  { id: 'unex_fashion_1', topicId: 'fashion', textKo: '개인 스타일과 평소 옷 입는 방식에 대해 말해 주세요. 주로 어떤 종류의 옷을 입나요?', text: 'Tell me about your personal style and how you typically dress. What kinds of clothing do you usually wear?', tips: ['평소 스타일', '자주 입는 옷 종류', '왜 그 스타일을 좋아하는지'] },
  { id: 'unex_fashion_2', topicId: 'fashion', textKo: '정말 마음에 드는 옷을 샀던 경험을 묘사해 주세요. 어떤 옷이었고 왜 골랐나요?', text: 'Describe a time when you bought a piece of clothing you really liked. What was it and why did you choose it?', tips: ['어떤 옷인지', '어디서 샀는지', '왜 그 옷을 골랐는지'] },
  { id: 'unex_weather_1', topicId: 'weather', textKo: '지금 사는 지역의 이맘때 날씨를 묘사해 주세요. 일상생활과 활동에 어떤 영향을 미치나요?', text: 'Describe the weather in your area at this time of year. How does it affect your daily life and activities?', tips: ['현재 날씨 묘사', '일상에 미치는 영향', '어떻게 적응하는지'] },
  { id: 'unex_weather_2', topicId: 'weather', textKo: '가장 좋아하는 계절에 대해 말해 주세요. 그 시기에 무엇을 즐기고 왜 좋아하나요?', text: 'Tell me about your favorite season. What do you enjoy doing during that time of year and why?', tips: ['좋아하는 계절 이유', '그 계절에 하는 활동', '그 계절의 특징'] },
  { id: 'unex_holiday_1', topicId: 'holiday', textKo: '자국에서 가장 중요한 국경일을 어떻게 보내는지 말해 주세요. 보통 무엇을 하나요?', text: 'Tell me about how you celebrate the most important national holiday in your country. What do you typically do?', tips: ['어떤 명절인지', '어떻게 보내는지', '가족과 하는 것들'] },
  { id: 'unex_holiday_2', topicId: 'holiday', textKo: '과거 기억에 남는 명절 행사를 묘사해 주세요. 무엇이 특별하거나 달랐나요?', text: 'Describe a memorable holiday celebration from your past. What made it special or different?', tips: ['어떤 명절이었는지', '특별했던 이유', '왜 기억에 남는지'] },
  { id: 'unex_transit_1', topicId: 'transportation', textKo: '사는 도시에서 어떻게 이동하는지 말해 주세요. 가장 자주 이용하는 교통수단과 그 이유는 무엇인가요?', text: 'Tell me about how you get around in your city. What form of transportation do you use most often and why?', tips: ['주로 쓰는 교통수단', '왜 그걸 쓰는지', '장점·단점'] },
  { id: 'unex_transit_2', topicId: 'transportation', textKo: '대중교통을 이용하면서 기억에 남는 경험을 묘사해 주세요. 어떤 일이 있었나요?', text: 'Describe a memorable experience you had while using public transportation. What happened?', tips: ['어떤 상황이었는지', '어떻게 됐는지', '어떤 느낌이었는지'] },
  { id: 'unex_restaurant_1', topicId: 'restaurant', textKo: '자주 가는 식당에 대해 말해 주세요. 보통 무엇을 주문하고 그 곳의 어떤 점이 좋은가요?', text: 'Tell me about a restaurant you enjoy going to. What do you usually order and what do you like about the place?', tips: ['어떤 식당인지', '자주 주문하는 것', '왜 좋아하는지'] },
  { id: 'unex_restaurant_2', topicId: 'restaurant', textKo: '아주 좋거나 아주 실망스러웠던 식사 경험을 묘사해 주세요. 어떤 일이 있었나요?', text: 'Describe a memorable dining experience you have had, whether very good or very disappointing. What happened?', tips: ['어떤 경험이었는지', '왜 기억에 남는지', '어떻게 됐는지'] },
  { id: 'unex_bank_1', topicId: 'bank', textKo: '보통 은행 업무를 어떻게 처리하는지 말해 주세요. 온라인 뱅킹을 선호하나요, 직접 방문을 선호하나요?', text: 'Tell me about how you usually handle your banking needs. Do you prefer online banking or visiting a branch in person?', tips: ['주로 어떻게 하는지', '온라인 뱅킹 사용 여부', '왜 그 방법을 선호하는지'] },
  { id: 'unex_bank_2', topicId: 'bank', textKo: '은행이나 금융 관련해서 특이한 문제를 겪었던 경험을 묘사해 주세요. 어떻게 해결했나요?', text: 'Describe a time when you experienced an unusual problem or situation related to banking or finances. How did you resolve it?', tips: ['어떤 문제였는지', '어떻게 해결했는지', '어떤 느낌이었는지'] },
  { id: 'unex_env_1', topicId: 'environment', textKo: '환경 보호나 지속 가능한 생활을 위해 일상에서 어떤 일을 하는지 말해 주세요.', text: 'Tell me about what you personally do in your daily life to help protect the environment or live more sustainably.', tips: ['하는 일들', '왜 중요하게 생각하는지', '어떤 습관이 있는지'] },
  { id: 'unex_env_2', topicId: 'environment', textKo: '현재 자국이 직면한 가장 심각한 환경 문제는 무엇이라고 생각하나요? 왜 해결이 중요한가요?', text: 'What do you think is the most serious environmental problem facing your country right now? Why is it important to address?', tips: ['어떤 환경 문제인지', '왜 심각한지', '어떻게 해결해야 하는지'] },
  { id: 'unex_tech_1', topicId: 'technology', textKo: '일상에서 기술을 어떻게 활용하는지 말해 주세요. 가장 많이 의존하는 기기나 앱은 무엇인가요?', text: 'Tell me about how you use technology in your daily life. What devices or apps do you rely on the most?', tips: ['자주 쓰는 기기·앱', '어떻게 쓰는지', '왜 그게 도움이 되는지'] },
  { id: 'unex_tech_2', topicId: 'technology', textKo: '기술이 일상을 크게 개선하거나 바꾼 방식을 묘사해 주세요.', text: 'Describe a way that technology has significantly improved or changed your everyday routine.', tips: ['어떻게 바뀌었는지', '구체적인 예시', '좋은 점과 나쁜 점'] },
  { id: 'unex_health_1', topicId: 'health', textKo: '건강을 유지하기 위해 어떤 노력을 하는지 말해 주세요. 신체적·정신적 건강을 위해 어떤 습관이 있나요?', text: 'Tell me about how you try to stay healthy. What habits do you have to maintain your physical or mental well-being?', tips: ['건강 관리 방법', '식습관', '운동·수면 루틴'] },
  { id: 'unex_health_2', topicId: 'health', textKo: '본인이나 가까운 사람이 건강 문제를 겪었던 때를 묘사해 주세요. 어떤 일이 있었고 어떻게 해결됐나요?', text: 'Describe a time when you or someone close to you had to deal with a health issue. What happened and how was it resolved?', tips: ['어떤 상황이었는지', '어떻게 대처했는지', '뭘 배웠는지'] },
  { id: 'unex_shop_1', topicId: 'shopping', textKo: '보통 어디서 어떻게 쇼핑하는지 말해 주세요. 온라인 쇼핑과 매장 방문 중 어느 쪽을 선호하나요?', text: 'Tell me about where and how you typically do your shopping. Do you prefer online or in-store shopping?', tips: ['주로 어디서 사는지', '어떤 방식을 선호하는지', '왜 그 방식이 편한지'] },
  { id: 'unex_shop_2', topicId: 'shopping', textKo: '특히 만족하거나 실망했던 쇼핑 경험을 묘사해 주세요.', text: 'Describe a memorable shopping experience — something you bought that you were especially happy or disappointed with.', tips: ['어떤 경험이었는지', '뭘 샀는지', '왜 기억에 남는지'] },
];

// ─── 롤플레이 질문 풀 ─────────────────────────────────────────────────────────
const roleplayPool: RawQ[] = [
  { id: 'rp_movie_a1', topicId: 'roleplay_movie', textKo: '이번 주말에 영화를 보고 싶습니다. 영화관에 전화해서 가기 전에 필요한 정보를 얻기 위해 3~4가지 질문을 해 보세요.', text: 'You would like to see a movie this weekend. Call the movie theater and ask 3 to 4 questions to get the information you need before you go.', tips: ['상영 시간 문의', '티켓 가격', '좌석 선택 여부', '주차 정보'] },
  { id: 'rp_movie_a2', topicId: 'roleplay_movie', textKo: '이번 주말에 친구와 영화를 보기로 했는데 갑자기 사정이 생겨 갈 수 없게 됐습니다. 친구에게 전화해서 사정을 설명하고, 사과하고, 대안 2~3가지를 제안해 보세요.', text: 'You planned to see a movie with a friend this weekend but something unexpected came up and you cannot make it. Call your friend, explain the problem, apologize, and suggest 2 to 3 alternative plans.', tips: ['왜 못 가는지 설명', '진심 어린 사과', '2~3가지 대안 제시'] },
  { id: 'rp_movie_a3', topicId: 'roleplay_movie', textKo: '친구와의 약속을 갑자기 취소해야 했던 때에 대해 말해 주세요. 어떤 일이 있었고, 본인과 친구는 어떻게 상황을 처리했나요?', text: 'Tell me about a time when you had to cancel plans with a friend unexpectedly. What happened, and how did you and your friend handle the situation?', tips: ['어떤 계획이었는지', '왜 취소해야 했는지', '어떻게 해결됐는지'] },
  { id: 'rp_hotel_b1', topicId: 'roleplay_hotel', textKo: '여행을 계획 중이고 호텔을 예약하려고 합니다. 호텔에 전화해서 예약 전에 객실과 시설에 대해 3~4가지 질문을 해 보세요.', text: 'You are planning a trip and want to book a hotel. Call the hotel and ask 3 to 4 questions about the rooms and facilities before making your reservation.', tips: ['방 종류와 가격', '조식 포함 여부', '수영장·시설', '위치와 교통'] },
  { id: 'rp_hotel_b2', topicId: 'roleplay_hotel', textKo: '호텔에 막 도착했는데 예약에 문제가 생겼습니다. 프런트 직원에게 문제를 설명하고 가능한 해결책 2~3가지를 제안해 보세요.', text: 'You have just arrived at the hotel but there is a problem with your reservation. Explain the problem to the front desk staff and suggest 2 to 3 possible solutions.', tips: ['문제가 뭔지 명확히 설명', '정중하게 해결 요청', '2~3가지 해결책 제안'] },
  { id: 'rp_hotel_b3', topicId: 'roleplay_hotel', textKo: '여행 중 숙소나 교통 문제와 같이 뭔가 잘못됐던 경험에 대해 말해 주세요. 어떤 일이 있었고 어떻게 해결했나요?', text: 'Tell me about a time when something went wrong during a trip, such as a problem with your accommodation or transportation. What happened and how did you deal with it?', tips: ['어떤 여행이었는지', '무슨 문제가 있었는지', '어떻게 해결됐는지'] },
  { id: 'rp_gym_c1', topicId: 'roleplay_gym', textKo: '헬스클럽 가입을 고려 중입니다. 헬스장에 전화해서 등록 전에 알아야 할 사항에 대해 3~4가지 질문을 해 보세요.', text: 'You are thinking about joining a gym or fitness club. Call the gym and ask 3 to 4 questions to find out what you need to know before you sign up.', tips: ['회원권 가격', '시설 종류', '운영 시간', '개인 트레이닝 여부'] },
  { id: 'rp_gym_c2', topicId: 'roleplay_gym', textKo: '헬스장 운동 세션을 예약했는데 갑자기 사정이 생겨 갈 수 없게 됐습니다. 헬스장에 전화해서 상황을 설명하고, 사과하고, 해결책을 제안해 보세요.', text: 'You scheduled a workout session at the gym but something unexpected happened and you cannot go. Call the gym, explain the situation, apologize, and suggest a way to solve the problem.', tips: ['왜 못 가는지 설명', '사과', '예약 변경이나 취소 방법'] },
  { id: 'rp_gym_c3', topicId: 'roleplay_gym', textKo: '갑자기 운동이나 스포츠 계획을 취소하거나 변경해야 했던 경험에 대해 말해 주세요. 어떤 일이 있었고 어떻게 처리했나요?', text: 'Tell me about a time when you suddenly had to cancel or change your exercise or sports plans. What happened and how did you manage the situation?', tips: ['어떤 계획이었는지', '왜 바꿔야 했는지', '어떻게 됐는지'] },
  { id: 'rp_rest_d1', topicId: 'roleplay_restaurant', textKo: '특별한 날을 위해 식당을 예약하려고 합니다. 식당에 전화해서 예약 결정 전에 3~4가지 질문을 해 보세요.', text: 'You want to make a reservation at a restaurant for a special occasion. Call the restaurant and ask 3 to 4 questions before you decide to book a table.', tips: ['예약 가능 여부', '메뉴와 가격', '분위기', '특별 서비스'] },
  { id: 'rp_rest_d2', topicId: 'roleplay_restaurant', textKo: '식당 예약을 했는데 막판에 취소하거나 변경해야 합니다. 식당에 전화해서 이유를 설명하고, 사과하고, 최선의 해결책을 찾아보세요.', text: 'You made a restaurant reservation but now you need to cancel or change it at the last minute. Call the restaurant, explain your reason, apologize, and work out the best solution.', tips: ['예약 변경/취소 이유', '정중한 사과', '다른 날 재예약 제안'] },
  { id: 'rp_rest_d3', topicId: 'roleplay_restaurant', textKo: '외식 계획을 취소해야 했거나 식당에서 문제가 생겼던 경험에 대해 말해 주세요. 어떤 일이 있었고 어떻게 해결됐나요?', text: 'Tell me about a time when you had to cancel a plan to eat out or when something went wrong at a restaurant. What happened and how did it get resolved?', tips: ['어떤 상황이었는지', '어떻게 됐는지', '어떻게 해결됐는지'] },
  { id: 'rp_lib_e1', topicId: 'roleplay_library', textKo: '특정 책을 찾거나 도서관/서점 서비스를 이용하려고 합니다. 전화해서 필요한 정보를 얻기 위해 3~4가지 질문을 해 보세요.', text: 'You want to find a specific book or use a library or bookstore service. Call and ask 3 to 4 questions to get the information you need.', tips: ['어떤 책인지', '이용 가능 여부', '서비스 문의', '운영 시간·위치'] },
  { id: 'rp_lib_e2', topicId: 'roleplay_library', textKo: '친구에게 빌린 책을 실수로 망가뜨렸습니다. 친구에게 전화해서 무슨 일이 있었는지 설명하고, 진심으로 사과하고, 어떻게 보상할지 제안해 보세요.', text: 'You borrowed a book from a friend but accidentally damaged it. Call your friend, explain what happened, apologize sincerely, and suggest how you will make it right.', tips: ['어떻게 된 건지 설명', '진심 어린 사과', '어떻게 보상할지 2~3가지 제안'] },
  { id: 'rp_lib_e3', topicId: 'roleplay_library', textKo: '다른 사람의 물건을 실수로 잃어버리거나 망가뜨린 경험에 대해 말해 주세요. 어떻게 처리했고 무엇을 배웠나요?', text: 'Tell me about a time when you accidentally lost or damaged something that belonged to someone else. How did you handle the situation and what did you learn from it?', tips: ['어떤 상황이었는지', '어떻게 처리했는지', '뭘 배웠는지'] },
];

// ─── 헬퍼 ─────────────────────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const asSurvey     = (q: RawQ): Question => ({ ...q, type: 'survey' });
const asUnexpected = (q: RawQ): Question => ({ ...q, type: 'unexpected' });
const asRoleplay   = (q: RawQ): Question => ({ ...q, type: 'roleplay' });

function buildSurveyPool(survey: SurveyData): RawQ[] {
  const pool: RawQ[] = [];
  if (survey.occupation !== 'other') pool.push(...(questions[survey.occupation] ?? []));
  pool.push(...(questions[survey.livingType] ?? []));
  for (const id of survey.leisureActivities) pool.push(...(questions[id] ?? []));
  for (const id of survey.hobbies)           pool.push(...(questions[id] ?? []));
  for (const id of survey.sports)            pool.push(...(questions[id] ?? []));
  for (const id of survey.vacations)         pool.push(...(questions[id] ?? []));
  return pool;
}

export function getRandomQuestion(survey: SurveyData): Question {
  const rand = Math.random();
  if (rand < 0.15) return asRoleplay(pick(roleplayPool));
  if (rand < 0.30) return asUnexpected(pick(unexpectedPool));
  const pool = buildSurveyPool(survey);
  if (pool.length === 0) return asSurvey({ ...questions['movie'][0] });
  return asSurvey(pick(pool));
}

// ─── 세션 생성 ────────────────────────────────────────────────────────────────
// 순서 고정: survey → unexpected → roleplay (실제 OPIc 순서)
export function generateSession1(survey: SurveyData): Question[] {
  const surveyPool = [...buildSurveyPool(survey)].sort(() => Math.random() - 0.5);
  return [
    ...surveyPool.slice(0, 5).map(asSurvey),
    asUnexpected(pick(unexpectedPool)),
    asRoleplay(pick(roleplayPool)),
  ];
}

export function generateSession2(survey: SurveyData, difficulty: DifficultyAdjustment): Question[] {
  const surveyPool = [...buildSurveyPool(survey)].sort(() => Math.random() - 0.5);

  if (difficulty === 'easier') {
    return surveyPool.slice(0, 5).map(asSurvey);
  }
  if (difficulty === 'harder') {
    return [
      ...surveyPool.slice(0, 2).map(asSurvey),
      asUnexpected(pick(unexpectedPool)),
      asUnexpected(pick(unexpectedPool)),
      asRoleplay(pick(roleplayPool)),
    ];
  }
  // same
  return [
    ...surveyPool.slice(0, 3).map(asSurvey),
    asUnexpected(pick(unexpectedPool)),
    asRoleplay(pick(roleplayPool)),
  ];
}
