'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { leisureItems, hobbyItems, sportItems, vacationItems } from '@/shared/lib/mockData';
import type { AnswerMode, Occupation, LivingType, SelfAssessmentLevel, SurveyData } from '@/shared/types';
import { RadioCircle, SelectableCard, Chip, Badge, Button } from '@/shared/ui';
import {
  occupations,
  livingTypes,
  selfAssessments,
  answerModes,
  STEP_LABELS,
} from '@/features/survey/model/config';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function toggle(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function SelectionBanner({ leisure, hobbies, sports, vacations }: { leisure: string[]; hobbies: string[]; sports: string[]; vacations: string[] }) {
  const total = leisure.length + hobbies.length + sports.length + vacations.length;
  const done = total >= 12;
  return (
    <div className={`mb-5 rounded-xl px-4 py-2.5 text-xs flex items-center justify-between gap-2 ${done ? 'bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800' : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900'}`}>
      <span className="text-zinc-500 dark:text-zinc-400">여가 <b>{leisure.length}</b> · 취미 <b>{hobbies.length}</b> · 운동 <b>{sports.length}</b> · 휴가 <b>{vacations.length}</b></span>
      <span className={`font-bold ${done ? 'text-purple-600 dark:text-purple-400' : 'text-amber-600 dark:text-amber-400'}`}>합계 {total} / 12</span>
    </div>
  );
}


function loadSaved(): SurveyData | null {
  try {
    const raw = localStorage.getItem('opic_survey');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function SurveyPage() {
  const router = useRouter();
  const saved = loadSaved();
  const isSaved = saved !== null;
  const [step, setStep] = useState<Step>(() => loadSaved() !== null ? 7 : 1);
  const [occupation, setOccupation] = useState<Occupation | null>(() => loadSaved()?.occupation ?? null);
  const [livingType, setLivingType] = useState<LivingType | null>(() => loadSaved()?.livingType ?? null);
  const [leisure, setLeisure] = useState<string[]>(() => loadSaved()?.leisureActivities ?? []);
  const [hobbies, setHobbies] = useState<string[]>(() => loadSaved()?.hobbies ?? []);
  const [sports, setSports] = useState<string[]>(() => loadSaved()?.sports ?? []);
  const [vacations, setVacations] = useState<string[]>(() => loadSaved()?.vacations ?? []);
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessmentLevel | null>(() => loadSaved()?.selfAssessment ?? null);
  const [answerMode, setAnswerMode] = useState<AnswerMode | null>(() => loadSaved()?.answerMode ?? null);

  const total = leisure.length + hobbies.length + sports.length + vacations.length;

  function canNext(): boolean {
    if (step === 1) return !!occupation;
    if (step === 2) return !!livingType;
    if (step === 3) return leisure.length >= 2;
    if (step === 4) return hobbies.length >= 1;
    if (step === 5) return sports.length >= 1;
    if (step === 6) return vacations.length >= 1 && total >= 12;
    if (step === 7) return !!selfAssessment;
    if (step === 8) return !!answerMode;
    return false;
  }

  function nextLabel(): string {
    if (step === 6 && total < 12) return `${12 - total}개 더 선택하세요`;
    if (step === 8) return '연습 시작 →';
    return '다음 →';
  }

  function handleReset() {
    localStorage.removeItem('opic_survey');
    setOccupation(null);
    setLivingType(null);
    setLeisure([]);
    setHobbies([]);
    setSports([]);
    setVacations([]);
    setSelfAssessment(null);
    setAnswerMode(null);
    setStep(1);
  }

  function handleNext() {
    if (!canNext()) return;
    if (step < 8) { setStep((s) => (s + 1) as Step); return; }
    const data: SurveyData = {
      occupation: occupation!,
      livingType: livingType!,
      leisureActivities: leisure,
      hobbies,
      sports,
      vacations,
      selfAssessment: selfAssessment!,
      answerMode: answerMode!,
    };
    localStorage.removeItem('opic_session_state');
    localStorage.setItem('opic_survey', JSON.stringify(data));
    router.push('/practice');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-2">
          {STEP_LABELS.map((_, i) => {
            const n = (i + 1) as Step;
            const clickable = isSaved || n < step;
            return (
              <div key={n} className="flex items-center gap-1 flex-1">
                <button
                  onClick={() => clickable && setStep(n)}
                  disabled={!clickable}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    n === step
                      ? 'bg-white dark:bg-zinc-950 border-2 border-purple-600 dark:border-purple-400 text-purple-700 dark:text-purple-300 ring-4 ring-purple-200 dark:ring-purple-900'
                      : n < step || isSaved
                      ? 'bg-purple-600 dark:bg-purple-500 text-white hover:opacity-80 cursor-pointer'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-default'
                  }`}
                >
                  {n < step || (isSaved && n !== step) ? '✓' : n}
                </button>
                {i < STEP_LABELS.length - 1 && (
                  <div className={`h-0.5 flex-1 transition-colors ${n < step || isSaved ? 'bg-purple-500 dark:bg-purple-600' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          {step} / {STEP_LABELS.length} &nbsp;—&nbsp;
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{STEP_LABELS[step - 1]}</span>
        </p>
      </div>

      {/* Navigation — 선택지 위 고정 */}
      <div className="mb-6 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
        {step > 1 ? (
          <Button variant="ghost" size="sm" onClick={() => setStep((s) => (s - 1) as Step)}>
            ← 이전
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={handleNext} disabled={!canNext()}>
          {nextLabel()}
        </Button>
      </div>

      {/* ── Step 1 ── */}
      {step === 1 && (
        <>
          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">현재 귀하의 상황은 어떻습니까?</h1>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">해당하는 항목을 하나 선택하세요</p>
          <div className="grid grid-cols-2 gap-3">
            {occupations.map((o) => (
              <SelectableCard key={o.id} selected={occupation === o.id} onClick={() => setOccupation(o.id)} className="items-center gap-3">
                <span className="text-2xl">{o.emoji}</span>
                <span className={`text-sm font-semibold ${occupation === o.id ? 'text-purple-800 dark:text-purple-200' : 'text-zinc-800 dark:text-zinc-100'}`}>{o.label}</span>
              </SelectableCard>
            ))}
          </div>
        </>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <>
          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">현재 어디에 거주하십니까?</h1>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">해당하는 항목을 하나 선택하세요</p>
          <div className="flex flex-col gap-3">
            {livingTypes.map((l) => (
              <SelectableCard key={l.id} selected={livingType === l.id} onClick={() => setLivingType(l.id)} className="items-center gap-4">
                <span className="text-2xl">{l.emoji}</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{l.label}</span>
                <RadioCircle selected={livingType === l.id} />
              </SelectableCard>
            ))}
          </div>
        </>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <>
          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">여가 활동</h1>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            해당하는 항목을 모두 선택하세요 <span className="font-semibold text-purple-600 dark:text-purple-400">(최소 2개)</span>
          </p>
          <SelectionBanner leisure={leisure} hobbies={hobbies} sports={sports} vacations={vacations} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {leisureItems.map((item) => (
              <Chip key={item.id} selected={leisure.includes(item.id)} emoji={item.emoji} onClick={() => setLeisure(toggle(leisure, item.id))}>
                {item.label}
              </Chip>
            ))}
          </div>
        </>
      )}

      {/* ── Step 4 ── */}
      {step === 4 && (
        <>
          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">취미나 관심사</h1>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            해당하는 항목을 모두 선택하세요 <span className="font-semibold text-purple-600 dark:text-purple-400">(최소 1개)</span>
          </p>
          <SelectionBanner leisure={leisure} hobbies={hobbies} sports={sports} vacations={vacations} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {hobbyItems.map((item) => (
              <Chip key={item.id} selected={hobbies.includes(item.id)} emoji={item.emoji} onClick={() => setHobbies(toggle(hobbies, item.id))}>
                {item.label}
              </Chip>
            ))}
          </div>
        </>
      )}

      {/* ── Step 5 ── */}
      {step === 5 && (
        <>
          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">운동</h1>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            해당하는 항목을 모두 선택하세요 <span className="font-semibold text-purple-600 dark:text-purple-400">(최소 1개)</span>
          </p>
          <SelectionBanner leisure={leisure} hobbies={hobbies} sports={sports} vacations={vacations} />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sportItems.map((item) => (
              <Chip key={item.id} selected={sports.includes(item.id)} emoji={item.emoji} onClick={() => setSports(toggle(sports, item.id))}>
                {item.label}
              </Chip>
            ))}
          </div>
        </>
      )}

      {/* ── Step 6 ── */}
      {step === 6 && (
        <>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">휴가나 출장</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            해당하는 항목을 모두 선택하세요 <span className="text-purple-600 dark:text-purple-400 font-semibold">(최소 1개)</span>
          </p>
          <SelectionBanner leisure={leisure} hobbies={hobbies} sports={sports} vacations={vacations} />
          {total < 12 && (
            <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl px-3 py-2 mb-4">
              3~6번 항목을 합해 12개 이상 선택해야 다음 단계로 갈 수 있어요. 현재 {total}개 — {12 - total}개 더 필요해요.
            </p>
          )}
          <div className="flex flex-col gap-3">
            {vacationItems.map((item) => (
              <SelectableCard key={item.id} selected={vacations.includes(item.id)} onClick={() => setVacations(toggle(vacations, item.id))} className="items-center gap-4">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">{item.label}</span>
                <RadioCircle selected={vacations.includes(item.id)} />
              </SelectableCard>
            ))}
          </div>
        </>
      )}

      {/* ── Step 7 ── */}
      {step === 7 && (
        <>
          <div className="mb-1 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">자가 평가</h1>
            {isSaved && (
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                ✏️ 서베이 수정하기
              </Button>
            )}
          </div>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">현재 본인의 영어 말하기 수준에 가장 가까운 것을 선택하세요</p>
          <div className="flex flex-col gap-3">
            {selfAssessments.map((s) => (
              <SelectableCard key={s.level} selected={selfAssessment === s.level} onClick={() => setSelfAssessment(s.level)}>
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${selfAssessment === s.level ? 'bg-purple-600 text-white dark:bg-purple-500' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                  {s.level}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{s.title}</span>
                    <Badge variant="purple">{s.expect}</Badge>
                  </div>
                  <div className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{s.desc}</div>
                </div>
                <RadioCircle selected={selfAssessment === s.level} />
              </SelectableCard>
            ))}
          </div>
        </>
      )}

      {/* ── Step 8 ── */}
      {step === 8 && (
        <>
          <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">답변 방식을 선택하세요</h1>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">선택한 방식으로 질문에 답변하게 돼요</p>
          <div className="flex flex-col gap-3">
            {answerModes.map((m) => (
              <SelectableCard key={m.mode} selected={answerMode === m.mode} onClick={() => setAnswerMode(m.mode)} className="items-center gap-4">
                <span className="text-3xl">{m.emoji}</span>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">{m.title}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{m.desc}</div>
                </div>
                <RadioCircle selected={answerMode === m.mode} />
              </SelectableCard>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
