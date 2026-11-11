'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/widgets/theme-toggle/ui/ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === '/survey' || pathname === '/practice' || pathname === '/result';

  function handlePracticeClick() {
    const hasSurvey = !!localStorage.getItem('opic_survey');
    router.push(hasSurvey ? '/practice' : '/survey');
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/85 backdrop-blur-md dark:border-[rgba(255,255,255,0.055)] dark:bg-[#0c0a18]/90">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 sm:px-12">
        <Link
          href="/"
          className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-purple-400 dark:to-purple-300"
        >
          EnglIdy
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePracticeClick}
            className={`text-sm font-medium transition-colors ${
              isActive
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            연습하기
          </button>
          <span className="cursor-not-allowed select-none text-sm font-medium text-zinc-300 dark:text-[#4a4268]">
            내 기록
          </span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
