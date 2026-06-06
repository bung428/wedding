import { useEffect, useRef, useState } from 'react';
import bgmUrl from '../../assets/songs/니가좋아.m4a';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldResumeRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // 화면이 켜지면 자동 재생 시도
    const tryAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // 브라우저 자동재생 정책으로 막힌 경우, 첫 사용자 상호작용 시 재생
        const playOnInteraction = () => {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
          window.removeEventListener('click', playOnInteraction);
          window.removeEventListener('touchstart', playOnInteraction);
          window.removeEventListener('scroll', playOnInteraction);
        };
        window.addEventListener('click', playOnInteraction);
        window.addEventListener('touchstart', playOnInteraction);
        window.addEventListener('scroll', playOnInteraction);
      }
    };

    tryAutoPlay();

    const pauseForBackground = () => {
      shouldResumeRef.current = !audio.paused;
      audio.pause();
      setIsPlaying(false);
    };

    const resumeFromBackground = () => {
      if (!shouldResumeRef.current) return;

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseForBackground();
      } else {
        resumeFromBackground();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', pauseForBackground);
    window.addEventListener('pageshow', resumeFromBackground);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', pauseForBackground);
      window.removeEventListener('pageshow', resumeFromBackground);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={bgmUrl} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? '배경음악 끄기' : '배경음악 켜기'}
        className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/70 shadow-md backdrop-blur-sm transition hover:bg-white"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {/* LP 레코드판: 재생 중엔 회전, 음소거 시 정지 + 흐림 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`h-7 w-7 ${isPlaying ? 'animate-spin' : ''}`}
          style={{
            animationDuration: '4s',
            opacity: isPlaying ? 1 : 0.4,
            transition: 'opacity 0.3s',
          }}
        >
          {/* 판 본체 */}
          <circle cx="12" cy="12" r="11" fill="#2c2722" />
          {/* 홈(그루브) */}
          <circle cx="12" cy="12" r="9" fill="none" stroke="#4a423a" strokeWidth="0.5" />
          <circle cx="12" cy="12" r="7" fill="none" stroke="#4a423a" strokeWidth="0.5" />
          <circle cx="12" cy="12" r="5.2" fill="none" stroke="#4a423a" strokeWidth="0.5" />
          {/* 가운데 라벨 */}
          <circle cx="12" cy="12" r="3.6" fill="#d98c8c" />
          {/* 빛 반사 (회전 시 입체감) */}
          <path d="M12 2 a10 10 0 0 1 7.07 2.93" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="0.8" strokeLinecap="round" />
          {/* 중심 구멍 */}
          <circle cx="12" cy="12" r="0.9" fill="#2c2722" />
        </svg>
        {/* 음소거 표시 */}
        {!isPlaying && (
          <span
            className="absolute h-7 w-[2px] rotate-45 rounded-full bg-stone-500"
            aria-hidden
          />
        )}
      </button>
    </>
  );
}
