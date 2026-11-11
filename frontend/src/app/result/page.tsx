'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { PracticeSession, FeedbackResult, SessionState } from '@/shared/types';

const levelColors: Record<string, string> = {
  NL:  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
  NM:  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
  NH:  'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
  IL:  'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
  IM1: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  IM2: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
  IM3: 'bg-purple-200 dark:bg-purple-800/40 text-purple-800 dark:text-purple-200',
  IH:  'bg-violet-200 dark:bg-violet-800/40 text-violet-800 dark:text-violet-200',
  AL:  'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
};

const levelDescriptions: Record<string, string> = {
  NL:  'Novice Low',
  NM:  'Novice Mid',
  NH:  'Novice High',
  IL:  'Intermediate Low',
  IM1: 'Intermediate Mid 1',
  IM2: 'Intermediate Mid 2',
  IM3: 'Intermediate Mid 3',
  IH:  'Intermediate High',
  AL:  'Advanced Low',
};

function ScoreCircle({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="140" height="140" className="-rotate-90">
      <circle cx="70" cy="70" r={r} stroke="var(--score-track)" strokeWidth="10" fill="none" />
      <circle
        cx="70" cy="70" r={r}
        stroke="var(--score-fill)" strokeWidth="10" fill="none"
        strokeDasharray={`${circ * (score / 100)} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text
        x="70" y="78" textAnchor="middle"
        style={{ transform: 'rotate(90deg)', transformOrigin: '70px 70px' }}
        fill="var(--score-text)" fontSize="28" fontWeight="bold"
      >{score}</text>
    </svg>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [session, setSession]           = useState<PracticeSession | null>(null);
  const [sessionState, setSessionState] = useState<SessionState | null>(null);
  const [feedback, setFeedback]         = useState<FeedbackResult | null>(null);
  const [showSample, setShowSample]     = useState(false);
  const [saved, setSaved]               = useState(false);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('opic_session');
    if (!raw) { router.replace('/survey'); return; }
    const s: PracticeSession = JSON.parse(raw);
    setSession(s);

    const stateRaw = localStorage.getItem('opic_session_state');
    if (stateRaw) setSessionState(JSON.parse(stateRaw));

    fetchFeedback(s);
  }, [router]);

  async function fetchFeedback(s: PracticeSession) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question:     s.question.text,
          answer:       s.answer,
          answerMode:   s.surveyData.answerMode,
          questionType: s.question.type ?? 'survey',
        }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: FeedbackResult = await res.json();
      setFeedback(data);

      const stateRaw = localStorage.getItem('opic_session_state');
      if (stateRaw) {
        const state: SessionState = JSON.parse(stateRaw);
        if (state.answers.length > 0) {
          const updated: SessionState = {
            ...state,
            answers: state.answers.map((a, i) =>
              i === state.answers.length - 1 ? { ...a, feedback: data } : a
            ),
          };
          localStorage.setItem('opic_session_state', JSON.stringify(updated));
          setSessionState(updated);
        }
      }
    } catch {
      setError('채점 중 오류가 발생했어요. 백엔드 서버가 실행 중인지 확인해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSave() {
    if (!session || !feedback) return;
    const history = JSON.parse(localStorage.getItem('opic_history') ?? '[]');
    history.unshift({ ...session, feedback, savedAt: Date.now() });
    localStorage.setItem('opic_history', JSON.stringify(history.slice(0, 50)));
    setSaved(true);
  }

  const nextButton = (() => {
    if (!sessionState) return { label: '🔄 다시 연습하기', action: () => router.push('/practice') };
    const { currentSession, currentIdx, questions1, questions2 } = sessionState;
    const s1len = questions1.length;
    const s2len = questions2?.length ?? 5;

    if (currentSession === 2 && currentIdx >= s2len) {
      return { label: '🏆 세션 요약 보기', action: () => router.push('/practice') };
    }
    if (currentSession === 1 && currentIdx >= s1len) {
      return { label: '🎯 1세션 완료 → 난이도 조정', action: () => router.push('/practice') };
    }
    const nextNum = currentSession === 1 ? currentIdx + 1 : currentIdx + 1;
    const total   = currentSession === 1 ? s1len : s2len;
    return { label: `다음 문항 (${currentSession}세션 ${nextNum}/${total}) →`, action: () => router.push('/practice') };
  })();

  const sessionBadge = (() => {
    if (!sessionState) return null;
    const { currentSession, currentIdx, questions1, questions2 } = sessionState;
    const total = currentSession === 1 ? questions1.length : (questions2?.length ?? 5);
    return `${currentSession}세션 ${currentIdx}/${total}`;
  })();

  if (!session || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-purple-200 dark:border-purple-900 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
        <p className="text-zinc-400 dark:text-zinc-500 text-sm">AI가 채점하고 있어요…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-zinc-700 dark:text-zinc-200 font-medium mb-2">{error}</p>
        <p className="text-zinc-400 dark:text-zinc-500 text-sm mb-6">
          백엔드: <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded">http://localhost:8080</code>
        </p>
        <button
          onClick={() => session && fetchFeedback(session)}
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white font-semibold px-6 py-2.5 rounded-xl"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Session badge */}
      {sessionBadge && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-semibold px-3 py-1 rounded-full border border-purple-100 dark:border-purple-800">
            {sessionBadge} 채점 완료
          </span>
        </div>
      )}

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">채점 결과</h1>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">AI가 분석한 답변 피드백이에요</p>

      {/* Score & level */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-6 flex items-center gap-6 mb-4">
        <ScoreCircle score={feedback.score} />
        <div>
          <div className="text-sm text-zinc-400 dark:text-zinc-500 mb-1">예상 등급</div>
          <span className={`inline-block font-bold text-xl px-4 py-1 rounded-full ${levelColors[feedback.level] ?? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'}`}>
            {feedback.level}
          </span>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{levelDescriptions[feedback.level]}</div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">100점 만점 기준 · 실제 점수와 다를 수 있어요</p>
        </div>
      </div>

      {/* My answer */}
      <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 mb-4">
        <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">내 답변</div>
        <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed">{session.answer}</p>
      </div>

      {/* Strengths */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-5 mb-3">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">✅ 잘한 점</div>
        <ul className="space-y-2">
          {feedback.strengths.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-200">
              <span className="text-green-500 mt-0.5">•</span> {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-5 mb-3">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">📈 개선할 점</div>
        <ul className="space-y-2">
          {feedback.improvements.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-200">
              <span className="text-orange-400 mt-0.5">•</span> {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Sample answer */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm p-5 mb-6">
        <button
          onClick={() => setShowSample((v) => !v)}
          className="w-full flex items-center justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <span>💬 모범 답변 보기</span>
          <span className="text-zinc-400 dark:text-zinc-500">{showSample ? '▲' : '▼'}</span>
        </button>
        {showSample && (
          <div className="mt-3 text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3 space-y-3">
            {feedback.sampleAnswer.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={nextButton.action}
          className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {nextButton.label}
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className="flex-1 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:border-zinc-200 dark:disabled:border-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold py-3 rounded-xl transition-colors"
        >
          {saved ? '✅ 저장됨' : '💾 저장하기'}
        </button>
        <Link href="/" className="flex-1 text-center bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold py-3 rounded-xl transition-colors">
          홈으로
        </Link>
      </div>
    </div>
  );
}
