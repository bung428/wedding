import { useCallback } from 'react';

export interface ToastTheme {
  backgroundColor: string;
  color: string;
  borderColor: string;
  colorScheme: 'light' | 'dark';
}

/**
 * 페이지 배경이 테마와 무관하게 항상 흰색이므로
 * 토스트는 흰색과 대비되는 어두운 색 + 잘 보이는 밝은 글자로 고정한다.
 */
const TOAST_THEME: ToastTheme = {
  backgroundColor: '#2d2a26',
  color: '#ffffff',
  borderColor: '#4b463f',
  colorScheme: 'dark',
};

export function getToastThemeForPage(): ToastTheme {
  return TOAST_THEME;
}

export function useToastTheme() {
  const refreshTheme = useCallback(() => {
    // 고정 테마이므로 별도 갱신 동작은 필요 없다.
  }, []);

  return { theme: TOAST_THEME, refreshTheme };
}
