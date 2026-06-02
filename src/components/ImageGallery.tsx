import { useState } from 'react';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
  initialVisibleCount?: number;
}

export default function ImageGallery({ images, initialVisibleCount = 6 }: ImageGalleryProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const visibleImages = showAll ? images : images.slice(0, initialVisibleCount);
  const hasMore = images.length > initialVisibleCount;

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div>
      {/* 그리드 레이아웃 - 첫 번째 이미지는 크게, 나머지는 작게 */}
      <div className="space-y-3">
        {/* 첫 번째 큰 이미지 */}
        {visibleImages.length > 0 && (
          <div
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg cursor-pointer group active:scale-[0.98] transition-transform duration-200"
            onClick={() => openModal(0)}
          >
            <img
              src={visibleImages[0]}
              alt="Wedding photo 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-300" />
          </div>
        )}

        {/* 나머지 이미지들 - 2열 그리드 */}
        {visibleImages.length > 1 && (
          <div className="grid grid-cols-2 gap-3">
            {visibleImages.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer group active:scale-95 transition-transform duration-200"
                onClick={() => openModal(index + 1)}
              >
                <img
                  src={image}
                  alt={`Wedding photo ${index + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 더보기 버튼 */}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-6 py-3 border-2 border-stone-300 rounded-full text-sm text-stone-600 hover:bg-stone-50 transition-all active:scale-98 flex items-center justify-center gap-2"
        >
          <span>사진 더 보기</span>
          <span className="text-xs">▼</span>
        </button>
      )}

      {/* 접기 버튼 */}
      {showAll && hasMore && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full mt-6 py-3 border-2 border-stone-300 rounded-full text-sm text-stone-600 hover:bg-stone-50 transition-all active:scale-98 flex items-center justify-center gap-2"
        >
          <span>접기</span>
          <span className="text-xs">▲</span>
        </button>
      )}

      {/* 이미지 모달 */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={images}
          currentIndex={selectedImageIndex}
          onClose={closeModal}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
}
