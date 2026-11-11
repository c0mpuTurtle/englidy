'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { generateSession1, generateSession2 } from '@/shared/lib/mockData';
import type {
  SurveyData,
  SessionState,
  Question,
  AnswerRecord,
  PracticeSession,
  DifficultyAdjustment,
} from '@/shared/types';

type View = 'loading' | 'question' | 'readjustment' | 'complete';

const typeBadge: Record<string, { label: string; className: string }> = {
  survey:     { label: '서베이 기반', className: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300' },
  unexpected: { label: '돌발 주제',   className: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' },
  roleplay:   { label: '롤플레이',    className: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300' },
};

// ── TTS helpers ──────────────────────────────────────────────────────────────
function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.88;
  utter.pitch = 1;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
}

function stopSpeak() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// ── Speaker icon ─────────────────────────────────────────────────────────────
function SpeakerIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>
      <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  );
}

export default function PracticePage() {
  const router = useRouter();
  const [view, setView]                   = useState<View>('loading');
  const [sessionState, setSessionState]   = useState<SessionState | null>(null);
  const [answer, setAnswer]               = useState('');
  const [showTips, setShowTips]           = useState(false);
  const [showQuestion, setShowQuestion]   = useState(false);
  const [showKo, setShowKo]               = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [isRecording, setIsRecording]     = useState(false);
  const [inputText, setInputText]         = useState('');
  const [isProcessing, setIsProcessing]   = useState(false);
  const [processed, setProcessed]         = useState('');
  const recognitionRef                    = useRef<any>(null);

  // Auto-play TTS when question changes
  useEffect(() => {
    setShowQuestion(false);
    setShowKo(false);
    setShowTips(false);
  }, [view]);

  const autoSpeak = useCallback((text: string) => {
    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  }, []);

  useEffect(() => {
    const surveyRaw = localStorage.getItem('opic_survey');
    if (!surveyRaw) { router.replace('/survey'); return; }

    const survey: SurveyData = JSON.parse(surveyRaw);
    if (!survey.leisureActivities) { router.replace('/survey'); return; }

    const stateRaw = localStorage.getItem('opic_session_state');

    if (!stateRaw) {
      const q1 = generateSession1(survey);
      const newState: SessionState = {
        questions1: q1,
        questions2: null,
        currentSession: 1,
        currentIdx: 0,
        difficultyAdjustment: null,
        surveyData: survey,
        answers: [],
      };
      localStorage.setItem('opic_session_state', JSON.stringify(newState));
      setSessionState(newState);
      setView('question');
      return;
    }

    const state: SessionState = JSON.parse(stateRaw);
    setSessionState(state);

    if (state.currentSession === 2 && state.questions2 && state.currentIdx >= state.questions2.length) {
      setView('complete');
    } else if (state.currentSession === 1 && state.currentIdx >= state.questions1.length) {
      setView('readjustment');
    } else {
      setView('question');
    }
  }, [router]);

  const currentQuestion: Question | null = sessionState
    ? sessionState.currentSession === 1
      ? (sessionState.questions1[sessionState.currentIdx] ?? null)
      : (sessionState.questions2?.[sessionState.currentIdx] ?? null)
    : null;

  // Auto-play when question is ready
  useEffect(() => {
    if (currentQuestion && view === 'question') {
      setShowQuestion(false);
      setShowKo(false);
      setShowTips(false);
      setAnswer('');
      setProcessed('');
      setInputText('');
      const t = setTimeout(() => autoSpeak(currentQuestion.text), 400);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.id, view]);

  function handleSpeakToggle() {
    if (isSpeaking) {
      stopSpeak();
      setIsSpeaking(false);
    } else if (currentQuestion) {
      autoSpeak(currentQuestion.text);
    }
  }

  function toggleRecording() {
    if (typeof window === 'undefined') return;
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SR) { alert('이 브라우저는 음성 인식을 지원하지 않아요. Chrome을 사용해 주세요.'); return; }
    if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      setAnswer(Array.from(e.results as any[]).map((r: any) => r[0].transcript).join(''));
    };
    rec.onend = () => setIsRecording(false);
    rec.lang = 'en-US';
    rec.start();
    recognitionRef.current = rec;
    setIsRecording(true);
  }

  async function handleProcess() {
    if (!inputText.trim() || !sessionState || !currentQuestion) return;
    setIsProcessing(true);
    try {
      const mode = sessionState.surveyData.answerMode;
      const res = await fetch('http://localhost:8080/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          input: inputText,
          question: currentQuestion.text,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProcessed(data.result);
      setAnswer(data.result);
    } catch {
      setProcessed('변환 중 오류가 발생했어요. 다시 시도해 주세요.');
    } finally {
      setIsProcessing(false);
    }
  }

  function handleSubmit() {
    if (!answer.trim() || !currentQuestion || !sessionState) return;
    stopSpeak();

    const newAnswer: AnswerRecord = { question: currentQuestion, answer: answer.trim() };
    const updatedState: SessionState = {
      ...sessionState,
      currentIdx: sessionState.currentIdx + 1,
      answers: [...sessionState.answers, newAnswer],
    };
    localStorage.setItem('opic_session_state', JSON.stringify(updatedState));

    const session: PracticeSession = {
      question: currentQuestion,
      surveyData: sessionState.surveyData,
      answer: answer.trim(),
      timestamp: Date.now(),
    };
    localStorage.setItem('opic_session', JSON.stringify(session));
    router.push('/result');
  }

  function handleReadjustment(choice: DifficultyAdjustment) {
    if (!sessionState) return;
    const q2 = generateSession2(sessionState.surveyData, choice);
    const updatedState: SessionState = {
      ...sessionState,
      questions2: q2,
      difficultyAdjustment: choice,
      currentSession: 2,
      currentIdx: 0,
    };
    localStorage.setItem('opic_session_state', JSON.stringify(updatedState));
    setSessionState(updatedState);
    setAnswer(''); setProcessed(''); setInputText('');
    setView('question');
  }

  function handleNewSession() {
    stopSpeak();
    localStorage.removeItem('opic_session_state');
    router.push('/practice');
  }

  const textareaClass = 'w-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-700';

  // ── Loading ──────────────────────────────────────────────────────────────
  if (view === 'loading') {
    return <div className="flex items-center justify-center h-64 text-zinc-400 dark:text-zinc-500">불러오는 중…</div>;
  }

  // ── Readjustment ─────────────────────────────────────────────────────────
  if (view === 'readjustment' && sessionState) {
    const scores = sessionState.answers.filter(a => a.feedback).map(a => a.feedback!.score);
    const avg = scores.length ? Math.round(scores.reduce((s, n) => s + n, 0) / scores.length) : null;

    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">1세션 완료!</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">{sessionState.questions1.length}문항을 모두 완료했어요</p>
          {avg !== null && (
            <p className="mt-2 text-purple-600 dark:text-purple-400 font-semibold text-lg">1세션 평균 {avg}점</p>
          )}
        </div>
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4 text-center">2세션 난이도를 선택하세요</h2>
        <div className="flex flex-col gap-3">
          {([
            { choice: 'easier' as const, emoji: '🌱', title: '쉬운 질문', desc: '서베이 주제 위주로 편안한 질문 5개' },
            { choice: 'same'   as const, emoji: '📌', title: '비슷한 수준', desc: '1세션과 같은 구성으로 5개 출제' },
            { choice: 'harder' as const, emoji: '🔥', title: '어려운 질문', desc: '돌발 주제·롤플레이 비중이 높은 5개' },
          ] as const).map(({ choice, emoji, title, desc }) => (
            <button
              key={choice}
              onClick={() => handleReadjustment(choice)}
              className="flex items-center gap-4 p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-all"
            >
              <span className="text-3xl">{emoji}</span>
              <div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-50">{title}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Complete ──────────────────────────────────────────────────────────────
  if (view === 'complete' && sessionState) {
    const { answers, questions1, questions2 } = sessionState;
    const scores = answers.filter(a => a.feedback).map(a => a.feedback!.score);
    const avg = scores.length ? Math.round(scores.reduce((s, n) => s + n, 0) / scores.length) : null;

    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">세션 완료!</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">총 {answers.length}문항 (1세션 {questions1.length}문항 + 2세션 {questions2?.length ?? 0}문항)</p>
          {avg !== null && (
            <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">평균 {avg}점</p>
          )}
        </div>
        <div className="space-y-3 mb-8">
          {answers.map((a, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                  {i < questions1.length ? `1세션 Q${i + 1}` : `2세션 Q${i - questions1.length + 1}`}
                  &nbsp;·&nbsp;
                  <span className={`${typeBadge[a.question.type ?? 'survey']?.className} px-1.5 py-0.5 rounded text-xs`}>
                    {typeBadge[a.question.type ?? 'survey']?.label}
                  </span>
                </span>
                {a.feedback && (
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full shrink-0">
                    {a.feedback.level} · {a.feedback.score}점
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-200 font-medium mb-1 line-clamp-1">{a.question.text}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2">{a.answer}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={handleNewSession} className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white font-semibold py-3 rounded-xl transition-colors">
            새 세션 시작
          </button>
          <Link href="/" className="flex-1 text-center bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold py-3 rounded-xl transition-colors">
            홈으로
          </Link>
        </div>
      </div>
    );
  }

  // ── Question ──────────────────────────────────────────────────────────────
  if (!sessionState || !currentQuestion) {
    return <div className="flex items-center justify-center h-64 text-zinc-400 dark:text-zinc-500">불러오는 중…</div>;
  }

  const { currentSession, currentIdx, questions1, questions2 } = sessionState;
  const totalInSession = currentSession === 1 ? questions1.length : (questions2?.length ?? 5);
  const mode = sessionState.surveyData.answerMode;
  const badge = typeBadge[currentQuestion.type] ?? typeBadge['survey'];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Session header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">{currentSession}세션</span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500">문항 {currentIdx + 1}/{totalInSession}</span>
          <button
            onClick={() => {
              if (confirm('서베이를 수정하면 현재 세션이 초기화돼요. 계속할까요?')) {
                stopSpeak();
                localStorage.removeItem('opic_session_state');
                router.push('/survey');
              }
            }}
            className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors underline underline-offset-2"
          >
            서베이 수정
          </button>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1 mb-6">
        <div
          className="bg-purple-500 dark:bg-purple-400 h-1 rounded-full transition-all"
          style={{ width: `${(currentIdx / totalInSession) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-6 mb-4">

        {/* TTS speaker button — always visible */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Question {currentIdx + 1}</span>
          <button
            onClick={handleSpeakToggle}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
              isSpeaking
                ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 animate-pulse'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-purple-100 dark:hover:bg-purple-950/60 hover:text-purple-600 dark:hover:text-purple-400'
            }`}
          >
            <SpeakerIcon playing={isSpeaking} />
            {isSpeaking ? '재생 중' : '듣기'}
          </button>
        </div>

        {/* Question toggle row */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setShowQuestion(v => !v)}
            className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {showQuestion
                ? <><path d="M9 18l6-6-6-6"/></>
                : <path d="M6 9l6 6 6-6"/>}
            </svg>
            {showQuestion ? '질문 숨기기' : '질문 텍스트 보기'}
          </button>

          {showQuestion && (
            <button
              onClick={() => setShowKo(v => !v)}
              className={`ml-auto flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                showKo
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-500'
              }`}
            >
              {showKo ? '🇺🇸 영어' : '🇰🇷 한글'}
            </button>
          )}
        </div>

        {showQuestion && (
          <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-xl p-4 mb-2">
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-50 leading-relaxed">
              {showKo ? currentQuestion.textKo : currentQuestion.text}
            </p>
          </div>
        )}

        {/* Tips toggle */}
        <button
          onClick={() => setShowTips(v => !v)}
          className="mt-2 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          {showTips ? '▲ 힌트 숨기기' : '▼ 답변 힌트 보기'}
        </button>
        {showTips && (
          <ul className="mt-2 space-y-1">
            {currentQuestion.tips.map((tip) => (
              <li key={tip} className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <span>💡</span> {tip}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Answer card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-6 mb-6">
        <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
          {mode === 'speaking' ? '🎤 말하기' : mode === 'writing' ? '✍️ 쓰기' : mode === 'translate' ? '🇰🇷 한→영 번역' : '🔑 키워드'}
        </div>

        {mode === 'writing' && (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="영어로 답변을 작성하세요..."
            rows={6}
            className={textareaClass}
          />
        )}

        {mode === 'speaking' && (
          <div className="space-y-3">
            <button
              onClick={toggleRecording}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white'
              }`}
            >
              {isRecording ? '⏹ 녹음 중지' : '🎤 녹음 시작'}
            </button>
            {answer
              ? <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-sm text-zinc-700 dark:text-zinc-200 min-h-[80px]">{answer}</div>
              : <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
                  버튼을 누르고 영어로 말해보세요 (Chrome 권장)<br/>
                  <span className="text-amber-500 dark:text-amber-400">⌨ macOS: 말하기 전 입력기를 영문(ABC)으로 바꿔주세요</span>
                </p>
            }
          </div>
        )}

        {(mode === 'translate' || mode === 'keyword') && (
          <div className="space-y-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'translate' ? '한국어로 답변 내용을 작성하세요...' : '키워드를 쉼표로 구분해 입력하세요 (예: 헬스장, 아침, 스트레스 해소)'}
              rows={3}
              className={textareaClass}
            />
            <button
              onClick={handleProcess}
              disabled={!inputText.trim() || isProcessing}
              className="w-full bg-purple-100 dark:bg-purple-950/40 hover:bg-purple-200 dark:hover:bg-purple-900/50 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 text-purple-700 dark:text-purple-300 disabled:text-zinc-400 dark:disabled:text-zinc-500 font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              {isProcessing ? '변환 중…' : mode === 'translate' ? '영어로 번역하기' : '문장으로 완성하기'}
            </button>
            {processed && (
              <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800 rounded-xl p-3 text-sm text-zinc-800 dark:text-zinc-100">
                <div className="text-xs text-purple-500 dark:text-purple-400 mb-1 font-semibold">변환 결과</div>
                {processed}
              </div>
            )}
          </div>
        )}

        {answer && mode !== 'writing' && mode !== 'speaking' && (
          <div className="mt-3">
            <label className="text-xs text-zinc-400 dark:text-zinc-500 mb-1 block">수정하기 (선택)</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              className={textareaClass}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!answer.trim()}
        className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-500 text-white font-bold py-3.5 rounded-xl text-base transition-colors"
      >
        채점 받기 →
      </button>
    </div>
  );
}
