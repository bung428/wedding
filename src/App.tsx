// import { RouterProvider } from 'react-router-dom';
// import { router } from './route';
import { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import ScrollReveal from './components/ScrollReveal';
import { useWeddingInfo } from './hooks/useWeddingInfo';
import { openKakaoMap, openNaverMap, openTmap } from './utils/mapLinks';

// 이미지 import
import blackCouple1 from '../assets/images/black_couple_1.jpg';
import blackCouple2 from '../assets/images/black_couple_2.jpg';
import blackCouple3 from '../assets/images/black_couple_3.jpg';
import blackCouple4 from '../assets/images/black_couple_4.jpg';
import blackCouple5 from '../assets/images/black_couple_5.jpg';
import blackSolo1 from '../assets/images/black_solo_1.jpg';
import blackSolo2 from '../assets/images/black_solo_2.jpg';
import kakiCouple1 from '../assets/images/kaki_couple_1.jpg';
import kakiCouple2 from '../assets/images/kaki_couple_2.jpg';
import kakiSolo1 from '../assets/images/kaki_solo_1.jpg';
import kakiSolo2 from '../assets/images/kaki_solo_2.jpg';
import whiteCouple1 from '../assets/images/white_couple_1.jpg';
import whiteCouple2 from '../assets/images/white_couple_2.jpg';
import whiteCouple3 from '../assets/images/white_couple_3.jpg';
import whiteCouple4 from '../assets/images/white_couple_4.jpg';
import whiteCouple5 from '../assets/images/white_couple_5.jpg';
import whiteSolo1 from '../assets/images/white_solo_1.jpg';
import whiteSolo2 from '../assets/images/white_solo_2.jpg';
import whiteSolo3 from '../assets/images/white_solo_3.jpg';
import whiteSolo4 from '../assets/images/white_solo_4.jpg';
import weddingPlace from '../assets/images/wedding_place.png';

// 로컬 웨딩 이미지 데이터
const WEDDING_IMAGES = [
  blackCouple1,
  blackCouple2,
  blackCouple3,
  blackCouple4,
  blackCouple5,
  blackSolo1,
  blackSolo2,
  kakiCouple1,
  kakiCouple2,
  kakiSolo1,
  kakiSolo2,
  whiteCouple1,
  whiteCouple2,
  whiteCouple3,
  whiteCouple4,
  whiteCouple5,
  whiteSolo1,
  whiteSolo2,
  whiteSolo3,
  whiteSolo4,
];

const MAIN_IMAGE = WEDDING_IMAGES[0];

const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

export default function App() {
  const { weddingInfo, isLoading } = useWeddingInfo();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = weddingInfo ? new Date(weddingInfo.wedding.date) : null;

  useEffect(() => {
    if (!weddingDate) return;

    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - Date.now();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  // 배경색 설정
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff'; // 흰색
    document.documentElement.style.backgroundColor = '#ffffff';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  if (isLoading || !weddingInfo || !weddingDate) {
    return <div className="min-h-screen bg-white" />;
  }

  const weddingMonth = weddingInfo.wedding.month;
  const weddingDay = weddingInfo.wedding.day;
  const weddingWeekday = WEEKDAYS[weddingDate.getDay()];
  const weddingHour = weddingDate.getHours();
  const weddingMinute = weddingDate.getMinutes();
  const weddingPeriod = weddingHour >= 12 ? '오후' : '오전';
  const weddingDisplayHour = weddingHour % 12 || 12;
  const weddingMinuteText = weddingMinute > 0 ? `${weddingMinute}분` : '';
  const weddingDateText = `${weddingDate.getFullYear()}년 ${weddingMonth}월 ${weddingDay}일 ${weddingWeekday} ${weddingPeriod} ${weddingDisplayHour}시 ${weddingMinuteText}`;
  const weddingShortDateText = `${weddingMonth}.${weddingDay}`;
  const weddingTimeText = `${weddingWeekday} ${weddingPeriod} ${weddingDisplayHour}시 ${weddingMinuteText}`;

  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      {/* 메인 히어로 섹션 - 전체 너비, 독립적으로 배치 */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          width: '100%',
          margin: 0,
          padding: 0,
          minHeight: '600px',
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${MAIN_IMAGE})`,
            filter: 'blur(2px)',
          }}
        />
        
        <div className="relative z-10 text-center px-4">
          <ScrollReveal direction="fade" delay={0.2}>
            <div className="mb-8">
              <div className="text-5xl sm:text-6xl font-serif text-stone-700 mb-6">
                {String(weddingInfo.wedding.month).padStart(2, '0')}<span className="text-3xl mx-2">/</span>{String(weddingInfo.wedding.day).padStart(2, '0')}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-stone-500 tracking-widest">{weddingInfo.groomName}</p>
              <div className="w-12 h-px bg-stone-300 mx-auto" />
              <p className="text-sm sm:text-base text-stone-500 tracking-widest">{weddingInfo.brideName}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <div className="mt-8 text-stone-600 text-xs sm:text-sm">
              <p>{weddingDateText}</p>
              <p className="mt-1">{weddingInfo.wedding.venue}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* 나머지 콘텐츠 영역 */}
      <main className="min-h-screen bg-white">
        <div className="max-w-md mx-auto">
        {/* 초대 메시지 */}
        <ScrollReveal>
          <section className="py-16 px-6 text-center">
            <p className="text-xs text-stone-400 tracking-[0.3em] mb-6">INVITATION</p>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-700 mb-8">초대합니다</h2>
            
            <div className="space-y-4 text-stone-600 leading-relaxed text-sm sm:text-base">
              <p>{weddingInfo.invitation_message.line1}</p>
              <p>{weddingInfo.invitation_message.line2}</p>
              <p>{weddingInfo.invitation_message.line3}</p>
              <p className="text-rose-500">{weddingInfo.invitation_message.line4}</p>
            </div>

            <div className="mt-12 space-y-3 text-sm text-stone-600">
              <p>{weddingInfo.groomParents.father} · {weddingInfo.groomParents.mother} 의 아들 <span className="font-semibold">{weddingInfo.groomName}</span></p>
              <p>{weddingInfo.brideParents.father} · {weddingInfo.brideParents.mother} 의 딸 <span className="font-semibold">{weddingInfo.brideName}</span></p>
            </div>
          </section>
        </ScrollReveal>

        {/* 캘린더 & 카운트다운 */}
        <ScrollReveal>
          <section className="py-12 px-6">
            <div className="text-center mb-8">
              <p className="text-2xl sm:text-3xl font-serif text-stone-700 mb-2">{weddingShortDateText}</p>
              <p className="text-sm text-stone-500">{weddingTimeText}</p>
            </div>

            {/* 카운트다운 */}
            <div className="flex justify-center gap-4 sm:gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">{String(timeLeft.days).padStart(3, '0')}</div>
                <div className="text-xs text-stone-400 mt-1">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">:</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs text-stone-400 mt-1">HOUR</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">:</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs text-stone-400 mt-1">MIN</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">:</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-light text-stone-700">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs text-stone-400 mt-1">SEC</div>
              </div>
            </div>

            <p className="text-center text-sm text-stone-500">
              {weddingInfo.groomName} ❤️ {weddingInfo.brideName}의 결혼식이 <span className="text-rose-500 font-semibold">{timeLeft.days}일</span> 남았습니다.
            </p>
          </section>
        </ScrollReveal>

        {/* 갤러리 */}
        <ScrollReveal>
          <section className="py-16 px-6">
            <div className="text-center mb-8">
              <p className="text-xs text-stone-400 tracking-[0.3em] mb-4">GALLERY</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-700">갤러리</h2>
            </div>
            <ImageGallery images={WEDDING_IMAGES} initialVisibleCount={6} />
          </section>
        </ScrollReveal>

        {/* 장소 안내 */}
        <ScrollReveal>
          <section className="py-16 px-6">
            <div className="text-center mb-8">
              <p className="text-xs text-stone-400 tracking-[0.3em] mb-4">LOCATION</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-700 mb-6">오시는 길</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-stone-700 mb-2">{weddingInfo.wedding.venue}</h3>
              <p className="text-sm text-stone-500 mb-4">{weddingInfo.wedding.address}</p>

              {/* 지도 - 웨딩 장소 이미지 */}
              <div className="w-full h-48 rounded-xl mb-4 overflow-hidden bg-stone-100">
                <img
                  src={weddingPlace}
                  alt="Wedding Venue Location"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openNaverMap(weddingInfo.wedding.venue)}
                  className="flex-1 py-2 border border-stone-300 rounded-lg text-xs text-stone-600 hover:bg-stone-50 transition"
                >
                  🗺️ 네이버 지도
                </button>
                <button
                  type="button"
                  onClick={() => openKakaoMap(weddingInfo.wedding.venue)}
                  className="flex-1 py-2 border border-stone-300 rounded-lg text-xs text-stone-600 hover:bg-stone-50 transition"
                >
                  🚗 카카오 내비
                </button>
                <button
                  type="button"
                  onClick={() => openTmap(weddingInfo.wedding.venue, weddingInfo.wedding.address)}
                  className="flex-1 py-2 border border-stone-300 rounded-lg text-xs text-stone-600 hover:bg-stone-50 transition"
                >
                  📍 티맵
                </button>
              </div>
            </div>

            {/* 교통 정보 */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚇</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-stone-700 mb-2">지하철</p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {weddingInfo.transportation.subway.map((info, idx) => (
                        <span key={idx}>{info}{idx < weddingInfo.transportation.subway.length - 1 ? <br /> : ''}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚌</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-stone-700 mb-2">버스</p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {weddingInfo.transportation.bus.map((info, idx) => (
                        <span key={idx}>{info}{idx < weddingInfo.transportation.bus.length - 1 ? <br /> : ''}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚐</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-stone-700 mb-2">셔틀버스</p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {weddingInfo.transportation.shuttleBus.map((info, idx) => (
                        <span key={idx}>{info}{idx < weddingInfo.transportation.shuttleBus.length - 1 ? <br /> : ''}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🅿️</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-stone-700 mb-2">주차안내</p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {weddingInfo.transportation.parking.map((info, idx) => (
                        <span key={idx}>{info}{idx < weddingInfo.transportation.parking.length - 1 ? <br /> : ''}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 마음 전하실 곳 */}
        <ScrollReveal>
          <section className="py-16 px-6">
            <div className="text-center mb-8">
              <p className="text-xs text-stone-400 tracking-[0.3em] mb-4">ACCOUNT</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-700">마음 전하실 곳</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-stone-50 rounded-xl overflow-hidden">
                <div className="py-4 px-6 text-sm font-semibold text-stone-700">
                  신랑측 계좌번호
                </div>
                <div className="px-6 pb-4 space-y-2 text-sm text-stone-600">
                  {weddingInfo.accounts.groom.map((account, idx) => (
                    <p key={idx}>{account.title}: {account.bank} {account.account} ({account.owner})</p>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl overflow-hidden">
                <div className="py-4 px-6 text-sm font-semibold text-stone-700">
                  신부측 계좌번호
                </div>
                <div className="px-6 pb-4 space-y-2 text-sm text-stone-600">
                  {weddingInfo.accounts.bride.map((account, idx) => (
                    <p key={idx}>{account.title}: {account.bank} {account.account} ({account.owner})</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 하단 */}
        <footer className="py-8 text-center text-xs text-stone-400">
          <p>Copyright 2026. FROM TODAY. All rights reserved.</p>
        </footer>
      </div>
    </main>
    </div>
  );
}
