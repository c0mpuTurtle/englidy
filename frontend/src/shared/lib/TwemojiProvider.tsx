'use client';
import { useEffect } from 'react';

export default function TwemojiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let busy = false;

    async function applyTwemoji() {
      if (busy) return;
      busy = true;
      const { default: twemoji } = await import('twemoji');
      twemoji.parse(document.body, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
      });
      busy = false;
    }

    const observer = new MutationObserver(() => {
      requestAnimationFrame(applyTwemoji);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    applyTwemoji();

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
