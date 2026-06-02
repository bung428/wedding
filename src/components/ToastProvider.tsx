import { AnimatePresence, motion } from 'framer-motion';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface ToastState {
  message: string;
  top: number;
  left: number;
  placement: 'above' | 'below';
}

interface ToastContextValue {
  showToast: (message: string, anchor?: HTMLElement | null) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 2500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<number>();

  const showToast = useCallback((message: string, anchor?: HTMLElement | null) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      const placement = rect.top > 52 ? 'above' : 'below';
      const top = placement === 'above' ? rect.top - 8 : rect.bottom + 8;

      setToast({
        message,
        top,
        left: rect.left + rect.width / 2,
        placement,
      });
    } else {
      setToast({
        message,
        top: window.innerHeight - 80,
        left: window.innerWidth / 2,
        placement: 'above',
      });
    }

    timeoutRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={`${toast.message}-${toast.top}-${toast.left}`}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            style={{ top: toast.top, left: toast.left }}
            className={`pointer-events-none fixed z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 whitespace-nowrap rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-xs font-medium text-white shadow-xl ${
              toast.placement === 'above' ? '-translate-y-full' : 'translate-y-0'
            }`}
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
