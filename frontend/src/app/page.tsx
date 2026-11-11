import Link from 'next/link';

const steps = [
  {
    num: '01',
    title: '서베이 완성',
    desc: '직업, 거주 형태, 여가·운동·취미·여행을 선택하는 8단계 설문 — 실제 OPIc 서베이와 동일한 구성이에요.',
  },
  {
    num: '02',
    title: '1세션 → 난이도 조정 → 2세션',
    desc: '7문항을 마친 뒤 체감 난이도를 직접 선택하면 AI가 2세션을 조정해요. 돌발·롤플레이 포함 실전 플로우.',
  },
  {
    num: '03',
    title: 'AI 즉시 채점',
    desc: 'ACTFL 2024 기준으로 NL부터 AL까지 등급을 판정하고, 잘한 점·개선점·모범 답변을 한 화면에서 확인해요.',
  },
];

const modes = [
  {
    title: '말하기',
    desc: '마이크로 말하면 음성을 텍스트로 자동 변환',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10a7 7 0 0 1-14 0"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <line x1="9"  y1="21" x2="15" y2="21"/>
      </svg>
    ),
  },
  {
    title: '쓰기',
    desc: '직접 영어로 타이핑해서 답변 작성',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
      </svg>
    ),
  },
  {
    title: '한→영 번역',
    desc: '한국어로 쓰면 AI가 자연스러운 영어로 번역',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h7"/>
        <path d="M9 3v2c0 4.418-2.239 8-5 8"/>
        <path d="M5 9c0 2.144 2.952 3.908 6.7 4"/>
        <path d="M12 20l4-9 4 9"/>
        <path d="M19.1 18h-6.2"/>
      </svg>
    ),
  },
  {
    title: '키워드',
    desc: '키워드만 입력하면 AI가 완성된 문장으로 만들어줘',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="5.5"/>
        <path d="M21 2l-9.6 9.6"/>
        <path d="M15.5 7.5 l3 3L22 7l-3-3"/>
      </svg>
    ),
  },
];

const levels = ['NL', 'NM', 'NH', 'IL', 'IM1', 'IM2', 'IM3', 'IH', 'AL'];

export default function Home() {
  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[calc(100vh-3.5rem)] flex items-center"
        style={{
          background: 'linear-gradient(145deg,#ddd5f5 0%,#c3aee8 30%,#a888d6 65%,#8f68c4 100%)',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 hidden dark:block"
          style={{background: 'linear-gradient(145deg,#120d28 0%,#0f0b22 55%,#0a0817 100%)'}} />

        {/* ── Orbs (light mode) ── */}
        <div className="dark:hidden absolute inset-0 pointer-events-none overflow-hidden">
          {/* 오른쪽 메인 헤일로 */}
          <div style={{position:'absolute',right:'-20%',top:'50%',transform:'translateY(-50%)',
            width:'min(90vw,860px)',height:'min(90vw,860px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(255,255,255,0.22) 0%,rgba(200,180,255,0.08) 45%,transparent 68%)',
            filter:'blur(60px)'}}/>
          {/* 오른쪽 코어 */}
          <div style={{position:'absolute',right:'8%',top:'50%',transform:'translateY(-50%)',
            width:'min(42vw,420px)',height:'min(42vw,420px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(255,255,255,0.5) 0%,rgba(220,200,255,0.2) 42%,transparent 65%)',
            filter:'blur(22px)'}}/>
          {/* 오른쪽 보라 핵 */}
          <div style={{position:'absolute',right:'18%',top:'45%',
            width:'min(22vw,220px)',height:'min(22vw,220px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(120,50,220,0.55) 0%,rgba(100,40,200,0.2) 50%,transparent 70%)',
            filter:'blur(5px)'}}/>
          {/* 왼쪽 하단 보조 */}
          <div style={{position:'absolute',left:'-8%',bottom:'-10%',
            width:'min(55vw,520px)',height:'min(55vw,520px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(180,150,255,0.18) 0%,rgba(140,100,220,0.07) 50%,transparent 70%)',
            filter:'blur(55px)'}}/>
          {/* 왼쪽 상단 액센트 */}
          <div style={{position:'absolute',left:'5%',top:'8%',
            width:'min(28vw,280px)',height:'min(28vw,280px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(255,255,255,0.3) 0%,rgba(210,190,255,0.1) 50%,transparent 70%)',
            filter:'blur(35px)'}}/>
          {/* 중앙 상단 미묘한 글로우 */}
          <div style={{position:'absolute',left:'38%',top:'-5%',
            width:'min(35vw,340px)',height:'min(35vw,340px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(255,255,255,0.15) 0%,rgba(190,160,255,0.06) 55%,transparent 72%)',
            filter:'blur(45px)'}}/>
          {/* 오른쪽 하단 소형 */}
          <div style={{position:'absolute',right:'6%',bottom:'5%',
            width:'min(18vw,180px)',height:'min(18vw,180px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(255,255,255,0.35) 0%,rgba(200,170,255,0.12) 55%,transparent 72%)',
            filter:'blur(18px)'}}/>
        </div>

        {/* ── Orbs (dark mode) ── */}
        <div className="hidden dark:block absolute inset-0 pointer-events-none overflow-hidden">
          {/* 오른쪽 대형 헤일로 */}
          <div style={{position:'absolute',right:'-18%',top:'50%',transform:'translateY(-50%)',
            width:'min(88vw,860px)',height:'min(88vw,860px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(139,92,246,0.14) 0%,rgba(109,40,217,0.05) 55%,transparent 72%)',
            filter:'blur(90px)'}}/>
          {/* 오른쪽 미드 */}
          <div style={{position:'absolute',right:'5%',top:'50%',transform:'translateY(-50%)',
            width:'min(50vw,500px)',height:'min(50vw,500px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(139,92,246,0.35) 0%,rgba(109,40,217,0.12) 50%,transparent 70%)',
            filter:'blur(45px)'}}/>
          {/* 오른쪽 코어 */}
          <div style={{position:'absolute',right:'17%',top:'44%',
            width:'min(24vw,240px)',height:'min(24vw,240px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(167,139,250,0.6) 0%,rgba(124,58,237,0.25) 48%,transparent 68%)',
            filter:'blur(8px)'}}/>
          {/* 왼쪽 하단 대형 */}
          <div style={{position:'absolute',left:'-12%',bottom:'-15%',
            width:'min(60vw,580px)',height:'min(60vw,580px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(109,40,217,0.2) 0%,rgba(79,22,180,0.07) 50%,transparent 70%)',
            filter:'blur(70px)'}}/>
          {/* 왼쪽 상단 */}
          <div style={{position:'absolute',left:'4%',top:'6%',
            width:'min(32vw,310px)',height:'min(32vw,310px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(139,92,246,0.22) 0%,rgba(109,40,217,0.08) 52%,transparent 70%)',
            filter:'blur(50px)'}}/>
          {/* 중앙 상단 */}
          <div style={{position:'absolute',left:'40%',top:'-8%',
            width:'min(38vw,380px)',height:'min(38vw,380px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(124,58,237,0.18) 0%,rgba(109,40,217,0.06) 55%,transparent 72%)',
            filter:'blur(60px)'}}/>
          {/* 오른쪽 하단 소형 */}
          <div style={{position:'absolute',right:'8%',bottom:'8%',
            width:'min(20vw,200px)',height:'min(20vw,200px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(167,139,250,0.3) 0%,rgba(139,92,246,0.1) 55%,transparent 72%)',
            filter:'blur(20px)'}}/>
          {/* 왼쪽 중단 미묘 */}
          <div style={{position:'absolute',left:'22%',top:'55%',
            width:'min(16vw,160px)',height:'min(16vw,160px)',borderRadius:'50%',
            background:'radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 68%)',
            filter:'blur(25px)'}}/>
        </div>

        {/* Monkey */}
        {/* light mode monkey */}
        <img
          src="/monkey.png"
          alt=""
          className="absolute pointer-events-none select-none dark:hidden"
          style={{
            right: '12%',
            top: '50%',
            transform: 'translateY(-52%)',
            width: 'min(48vw, 520px)',
            zIndex: 30,
          }}
        />
        {/* dark mode monkey — edges faded into background */}
        <img
          src="/monkey.png"
          alt=""
          className="absolute pointer-events-none select-none hidden dark:block"
          style={{
            right: '12%',
            top: '50%',
            transform: 'translateY(-52%)',
            width: 'min(48vw, 520px)',
            zIndex: 30,
            maskImage: 'radial-gradient(ellipse 78% 82% at 55% 50%, black 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 78% 82% at 55% 50%, black 50%, transparent 100%)',
            opacity: 0.88,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 py-24 sm:py-36">
          <div className="max-w-[500px]">

            <h1 className="font-bold tracking-[-0.025em] mb-7" style={{lineHeight: 1.1}}>
              <span className="text-white block" style={{fontSize:'clamp(2.75rem,6.5vw,4.25rem)'}}>오픽은 기세다!</span>
              <span
                className="dark:hidden block bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500 bg-clip-text text-transparent"
                style={{fontSize:'clamp(2.75rem,6.5vw,4.25rem)', marginTop:'0.5em'}}
              >Englidy</span>
              <span
                className="hidden dark:block bg-gradient-to-r from-fuchsia-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
                style={{fontSize:'clamp(2.75rem,6.5vw,4.25rem)', marginTop:'0.5em'}}
              >Englidy</span>
            </h1>

            <p className="text-white/60 leading-relaxed mb-11 max-w-[360px]"
              style={{fontSize:'clamp(0.95rem,2vw,1.1rem)'}}>
              AI 기반 OPIc 영어 학습 플랫폼 - 잉글리디
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/survey"
                className="bg-white text-purple-700 font-semibold px-7 py-3 rounded-full text-sm hover:opacity-90 active:scale-[0.98] transition-all">
                시작하기
              </Link>
              <Link href="#how"
                className="font-medium px-7 py-3 rounded-full text-sm text-white/80 hover:bg-white/10 active:scale-[0.98] transition-all"
                style={{border:'1px solid rgba(255,255,255,0.28)'}}>
                더 알아보기
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how"
        className="py-28 px-6 sm:px-12 bg-white dark:bg-[#0c0a18]">
        <div className="max-w-5xl mx-auto">

          <p className="text-[11px] font-semibold text-zinc-400 dark:text-[#6a5f88] uppercase tracking-[0.2em] mb-16">
            이용 방법
          </p>

          <div className="divide-y divide-zinc-100 dark:divide-[rgba(255,255,255,0.055)]">
            {steps.map((s) => (
              <div key={s.num} className="grid grid-cols-[72px_1fr] sm:grid-cols-[112px_1fr] gap-6 sm:gap-10 py-10 group cursor-default">
                <span className="text-[2.6rem] sm:text-[3.4rem] font-black leading-none select-none
                  text-zinc-100 dark:text-[#1e1836]
                  group-hover:text-purple-100 dark:group-hover:text-[#2a1f4e]
                  transition-colors duration-300">
                  {s.num}
                </span>
                <div className="pt-0.5">
                  <h3 className="font-semibold text-[1.05rem] mb-2 tracking-tight
                    text-zinc-900 dark:text-[#ede9f8]">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-lg
                    text-zinc-500 dark:text-[#9389b5]">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 답변 방식 ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-zinc-50/80 dark:bg-[#110e22]">
        <div className="max-w-5xl mx-auto">

          <p className="text-[11px] font-semibold text-zinc-400 dark:text-[#6a5f88] uppercase tracking-[0.2em] mb-12">
            4가지 답변 방식
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px
            bg-zinc-200/70 dark:bg-[rgba(255,255,255,0.055)]
            rounded-2xl overflow-hidden border border-zinc-200/70 dark:border-[rgba(255,255,255,0.055)]">
            {modes.map((m) => (
              <div key={m.title}
                className="bg-white dark:bg-[#15122a] p-6 sm:p-8 flex flex-col gap-5
                  hover:bg-purple-50 dark:hover:bg-[#1b1736] transition-colors duration-200 group">
                <span className="text-zinc-400 dark:text-[#9389b5] group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                  {m.icon}
                </span>
                <div>
                  <div className="font-semibold text-sm mb-1.5 text-zinc-900 dark:text-[#ede9f8]">
                    {m.title}
                  </div>
                  <div className="text-xs leading-relaxed text-zinc-500 dark:text-[#9389b5]">
                    {m.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPIc 등급 ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-12 bg-white dark:bg-[#0c0a18]">
        <div className="max-w-5xl mx-auto">

          <p className="text-[11px] font-semibold text-zinc-400 dark:text-[#6a5f88] uppercase tracking-[0.2em] mb-12">
            OPIc 등급 체계
          </p>

          <div className="flex items-end gap-1.5 sm:gap-2.5">
            {levels.map((lv, i) => {
              const h = 18 + i * 15;
              const alpha = 0.22 + i * 0.085;
              return (
                <div key={lv} className="flex-1 flex flex-col items-center gap-3 group cursor-default">
                  <div
                    className="w-full rounded-t-md sm:rounded-t-lg transition-transform duration-200 group-hover:-translate-y-1.5"
                    style={{
                      height: `${h}px`,
                      background: `rgba(139,92,246,${alpha})`,
                    }}
                  />
                  <span className="text-[9px] sm:text-[11px] font-bold tracking-wide text-zinc-500 dark:text-[#9389b5]">
                    {lv}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-5">
            <span className="text-[10px] text-zinc-300 dark:text-[#4a4268]">초급</span>
            <span className="text-[10px] text-zinc-300 dark:text-[#4a4268]">고급</span>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 sm:px-12 bg-zinc-50/80 dark:bg-[#110e22]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-bold tracking-tight mb-3 text-zinc-900 dark:text-[#ede9f8]"
              style={{fontSize:'clamp(1.6rem,4vw,2.4rem)'}}>
              지금 바로 시작해 보세요.
            </h2>
            <p className="text-sm text-zinc-500 dark:text-[#9389b5]">
              무료 · 회원가입 불필요 · 브라우저만 있으면 됩니다.
            </p>
          </div>
          <Link href="/survey"
            className="shrink-0 inline-flex items-center gap-2.5
              bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-400
              text-white font-semibold px-8 py-3.5 rounded-full text-sm
              transition-colors active:scale-[0.98] whitespace-nowrap">
            서베이 시작하기
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
