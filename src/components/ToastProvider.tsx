import { AnimatePresence, motion } from 'framer-motion';
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useToastTheme } from '../hooks/useToastTheme';

interface AnchorRect {
  top: number;
  right: number;
  bottom: number;
}

interface ToastState {
  message: string;
  anchorRect: AnchorRect;
  placement: 'above' | 'below';
}

interface ToastContextValue {
  showToast: (message: string, anchor?: HTMLElement | null) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 2500;
const VIEWPORT_MARGIN = 16;
/** 토스트 상단이 복사 버튼 상단보다 올라가는 정도 */
const TOAST_RAISE_ABOVE_BUTTON = 40;

export function ToastProvider({ children }: { children: ReactNode }) {
  const { theme: toastTheme, refreshTheme } = useToastTheme();
  const [toast, setToast] = useState<ToastState | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const toastRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string, anchor?: HTMLElement | null) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setPosition(null);
    refreshTheme();

    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      const placement = rect.top > 56 ? 'above' : 'below';
      setToast({
        message,
        anchorRect: { top: rect.top, right: rect.right, bottom: rect.bottom },
        placement,
      });
    } else {
      setToast({
        message,
        anchorRect: {
          top: window.innerHeight - 48,
          right: window.innerWidth / 2,
          bottom: window.innerHeight - 32,
        },
        placement: 'above',
      });
    }

    timeoutRef.current = window.setTimeout(() => {
      setToast(null);
      setPosition(null);
    }, TOAST_DURATION_MS);
  }, [refreshTheme]);

  useLayoutEffect(() => {
    if (!toast || !toastRef.current) return;

    const { width, height } = toastRef.current.getBoundingClientRect();
    const { top, right, bottom } = toast.anchorRect;
    const margin = VIEWPORT_MARGIN;

    let left = right - width;
    left = Math.max(margin, Math.min(left, window.innerWidth - margin - width));

    let toastTop = toast.placement === 'above' ? top - TOAST_RAISE_ABOVE_BUTTON : bottom + 12;

    toastTop = Math.max(margin, Math.min(toastTop, window.innerHeight - margin - height));

    setPosition({ top: toastTop, left });
  }, [toast]);

  const toastLayer =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {toast ? (
              <motion.div
                key={toast.message}
                role="status"
                aria-live="polite"
                initial={{ y: 1, scale: 0.94 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 1, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                style={
                  position
                    ? { top: position.top, left: position.left, visibility: 'visible' }
                    : { top: toast.anchorRect.top, left: toast.anchorRect.right, visibility: 'hidden' }
                }
                className="pointer-events-none fixed z-[9999] isolate"
              >
                <div
                  ref={toastRef}
                  className="rounded-2xl border px-4 py-2 text-center text-sm font-medium leading-relaxed shadow-[0_8px_16px_rgba(0,0,0,0.18),0_16px_48px_rgba(0,0,0,0.32)]"
                  style={{
                    colorScheme: toastTheme.colorScheme,
                    backgroundColor: toastTheme.backgroundColor,
                    color: toastTheme.color,
                    borderColor: toastTheme.borderColor,
                    WebkitTextFillColor: toastTheme.color,
                  }}
                >
                  {toast.message}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastLayer}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
