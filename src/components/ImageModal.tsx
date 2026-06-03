import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: ImageModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  // 스크롤 방지 (현재 위치 유지)
  useEffect(() => {
    const scrollY = window.scrollY;
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  // 스와이프 핸들러
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold && hasPrevious) {
      onPrevious();
    } else if (info.offset.x < -swipeThreshold && hasNext) {
      onNext();
    }
  };

  const modalContent = (
    <>
      <AnimatePresence>
        {/* Dim 배경 레이어 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0"
          onClick={onClose}
          style={{ 
            zIndex: 9998,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
        />

        {/* 모달 컨텐츠 레이어 */}
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, pointerEvents: 'none' }}
        >
          {/* 이미지 - 스와이프 가능 */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            className="relative w-full h-full max-w-4xl flex items-center justify-center px-4 cursor-grab active:cursor-grabbing"
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Wedding photo ${currentIndex + 1}`}
              className="max-w-full max-h-[calc(100vh-100px)] object-contain rounded-lg shadow-2xl select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </AnimatePresence>

      {/* UI 컨트롤 레이어 (최상위) */}
      <div className="fixed inset-0" style={{ zIndex: 10000, pointerEvents: 'none' }}>
        {/* 좌측 이동 버튼 - centerLeft */}
        {hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all"
            style={{
              pointerEvents: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            }}
            aria-label="이전 이미지"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* 우측 이동 버튼 - centerRight */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all"
            style={{
              pointerEvents: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
            }}
            aria-label="다음 이미지"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* 닫기 버튼 - 우측 상단, 이미지 바깥쪽 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-all"
          style={{
            pointerEvents: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: '#ffffff',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
          }}
          aria-label="닫기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 이미지 카운터 - 상단 중앙 */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            pointerEvents: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: '#ffffff',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </>
  );

  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}
