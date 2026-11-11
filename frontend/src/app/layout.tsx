import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Navbar from '@/widgets/navbar/ui/Navbar';
import TwemojiProvider from '@/shared/lib/TwemojiProvider';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EnglIdy — OPIc 스터디',
  description: 'AI 기반 OPIc 예상 질문 생성 및 채점 플랫폼',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TwemojiProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </TwemojiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
