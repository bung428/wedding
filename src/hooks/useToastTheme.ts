import { useCallback, useEffect, useState } from 'react';

export interface ToastTheme {
  backgroundColor: string;
  color: string;
  borderColor: string;
  colorScheme: 'light' | 'dark';
}

/** 밝은 화면 → 어두운 토스트 / 어두운 화면 → 밝은 토스트 */
const LIGHT_PAGE_TOAST: ToastTheme = {
  backgroundColor: '#171717',
  color: '#ffffff',
  borderColor: '#44403c',
  colorScheme: 'dark',
};

const DARK_PAGE_TOAST: ToastTheme = {
  backgroundColor: '#ffffff',
  color: '#171717',
  borderColor: '#d6d3d1',
  colorScheme: 'light',
};

function parseRgb(color: string): [number, number, number] | null {
  const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function isDarkColor(color: string): boolean {
  const rgb = parseRgb(color);
  if (!rgb) return false;
  const [r, g, b] = rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

function prefersDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/** 실제로 사용자에게 보이는 화면이 어두운지 판별 */
function isPageVisuallyDark(): boolean {
  if (prefersDarkMode()) {
    // 모바일 다크 모드: CSS상 body가 #fff여도 화면은 검정으로 보이는 경우가 많음
    return true;
  }

  const surfaces = [document.body, document.documentElement];

  for (const el of surfaces) {
    const bg = getComputedStyle(el).backgroundColor;
    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') continue;
    if (isDarkColor(bg)) return true;
  }

  return false;
}

export function getToastThemeForPage(): ToastTheme {
  return isPageVisuallyDark() ? DARK_PAGE_TOAST : LIGHT_PAGE_TOAST;
}

export function useToastTheme() {
  const [theme, setTheme] = useState<ToastTheme>(() =>
    typeof document !== 'undefined' ? getToastThemeForPage() : LIGHT_PAGE_TOAST,
  );

  const refreshTheme = useCallback(() => {
    setTheme(getToastThemeForPage());
  }, []);

  useEffect(() => {
    refreshTheme();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', refreshTheme);

    const observer = new MutationObserver(refreshTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => {
      media.removeEventListener('change', refreshTheme);
      observer.disconnect();
    };
  }, [refreshTheme]);

  return { theme, refreshTheme };
}
