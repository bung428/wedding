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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const timeoutRef = useRef<number>();
  const toastRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string, anchor?: HTMLElement | null) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setPosition(null);

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
  }, []);

  useLayoutEffect(() => {
    if (!toast || !toastRef.current) return;

    const { width, height } = toastRef.current.getBoundingClientRect();
    const { top, right, bottom } = toast.anchorRect;
    const margin = VIEWPORT_MARGIN;

    // 버튼 오른쪽에 맞추고 왼쪽으로 펼침 (우측 화면 잘림 방지)
    let left = right - width;
    left = Math.max(margin, Math.min(left, window.innerWidth - margin - width));

    const anchorY = toast.placement === 'above' ? top - 10 : bottom + 10;
    let toastTop = toast.placement === 'above' ? anchorY - height : anchorY;

    // 상·하단 여백 보정
    toastTop = Math.max(margin, Math.min(toastTop, window.innerHeight - margin - height));

    setPosition({ top: toastTop, left });
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast ? (
          <motion.div
            ref={toastRef}
            key={toast.message}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            style={
              position
                ? { top: position.top, left: position.left, visibility: 'visible' }
                : { top: toast.anchorRect.top, left: toast.anchorRect.right, visibility: 'hidden' }
            }
            className="pointer-events-none fixed z-50 rounded-lg border border-stone-700 bg-stone-900 px-5 py-3 text-sm font-medium leading-snug text-white shadow-xl"
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
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
