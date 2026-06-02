// import { RouterProvider } from 'react-router-dom';
// import { router } from './route';
import { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import ScrollReveal from './components/ScrollReveal';

// 환경변수에서 웨딩 정보 파싱
const weddingInfoString = import.meta.env.VITE_WEDDING_INFO;
interface WeddingInfo {
  groomName: string;
  brideName: string;
  groomParents: { father: string; mother: string };
  brideParents: { father: string; mother: string };
  wedding: {
    date: string;
    month: number;
    day: number;
    weekday: string;
    period: string;
    hour: number;
    minute: number;
    venue: string;
    address: string;
  };
  invitation_message: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
  accounts: {
    groom: Array<{ title: string; bank: string; account: string; owner: string }>;
    bride: Array<{ title: string; bank: string; account: string; owner: string }>;
  };
  transportation: {
    subway: string[];
    bus: string[];
    shuttleBus: string[];
    parking: string[];
  };
}

let WEDDING_INFO: WeddingInfo;
try {
  WEDDING_INFO = JSON.parse(weddingInfoString);
} catch (e) {
  console.error('Failed to parse VITE_WEDDING_INFO:', e);
  WEDDING_INFO = {
    groomName: '신랑',
    brideName: '신부',
    groomParents: { father: '신랑 아버지', mother: '신랑 어머니' },
    brideParents: { father: '신부 아버지', mother: '신부 어머니' },
    wedding: {
      date: '2026-05-30T13:30:00',
      month: 5,
      day: 30,
      weekday: '토요일',
      period: '오후',
      hour: 13,
      minute: 30,
      venue: '예식장',
      address: '주소',
    },
    invitation_message: { line1: '', line2: '', line3: '', line4: '' },
    accounts: { groom: [], bride: [] },
    transportation: { subway: [], bus: [], shuttleBus: [], parking: [] },
  };
}

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

const WEDDING_DATE = new Date(WEDDING_INFO.wedding.date);


export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = WEDDING_DATE.getTime() - new Date().getTime();
      
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
  }, []);

  // 배경색 설정
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff'; // 흰색
    document.documentElement.style.backgroundColor = '#ffffff';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weddingMonth = WEDDING_INFO.wedding.month;
  const weddingDay = WEDDING_INFO.wedding.day;
  const weddingWeekday = WEEKDAYS[WEDDING_DATE.getDay()];
  const weddingHour = WEDDING_DATE.getHours();
  const weddingMinute = WEDDING_DATE.getMinutes();
  const weddingPeriod = weddingHour >= 12 ? '오후' : '오전';
  const weddingDisplayHour = weddingHour % 12 || 12;
  const weddingMinuteText = weddingMinute > 0 ? `${weddingMinute}분` : '';
  const weddingDateText = `${WEDDING_DATE.getFullYear()}년 ${weddingMonth}월 ${weddingDay}일 ${weddingWeekday} ${weddingPeriod} ${weddingDisplayHour}시 ${weddingMinuteText}`;
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
                {String(WEDDING_INFO.wedding.month).padStart(2, '0')}<span className="text-3xl mx-2">/</span>{String(WEDDING_INFO.wedding.day).padStart(2, '0')}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-stone-500 tracking-widest">{WEDDING_INFO.groomName}</p>
              <div className="w-12 h-px bg-stone-300 mx-auto" />
              <p className="text-sm sm:text-base text-stone-500 tracking-widest">{WEDDING_INFO.brideName}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <div className="mt-8 text-stone-600 text-xs sm:text-sm">
              <p>{weddingDateText}</p>
              <p className="mt-1">{WEDDING_INFO.wedding.venue}</p>
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
              <p>{WEDDING_INFO.invitation_message.line1}</p>
              <p>{WEDDING_INFO.invitation_message.line2}</p>
              <p>{WEDDING_INFO.invitation_message.line3}</p>
              <p className="text-rose-500">{WEDDING_INFO.invitation_message.line4}</p>
            </div>

            <div className="mt-12 space-y-3 text-sm text-stone-600">
              <p>{WEDDING_INFO.groomParents.father} · {WEDDING_INFO.groomParents.mother} 의 아들 <span className="font-semibold">{WEDDING_INFO.groomName}</span></p>
              <p>{WEDDING_INFO.brideParents.father} · {WEDDING_INFO.brideParents.mother} 의 딸 <span className="font-semibold">{WEDDING_INFO.brideName}</span></p>
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
              {WEDDING_INFO.groomName} ❤️ {WEDDING_INFO.brideName}의 결혼식이 <span className="text-rose-500 font-semibold">{timeLeft.days}일</span> 남았습니다.
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
              <h3 className="text-lg font-semibold text-stone-700 mb-2">{WEDDING_INFO.wedding.venue}</h3>
              <p className="text-sm text-stone-500 mb-4">{WEDDING_INFO.wedding.address}</p>

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
                  onClick={() => window.open(`https://map.naver.com/index.nhn?query=${encodeURIComponent(WEDDING_INFO.wedding.venue)}`, '_blank')}
                  className="flex-1 py-2 border border-stone-300 rounded-lg text-xs text-stone-600 hover:bg-stone-50 transition"
                >
                  🗺️ 네이버 지도
                </button>
                <button
                  onClick={() => window.open(`https://map.kakao.com/?q=${encodeURIComponent(WEDDING_INFO.wedding.venue)}`, '_blank')}
                  className="flex-1 py-2 border border-stone-300 rounded-lg text-xs text-stone-600 hover:bg-stone-50 transition"
                >
                  🚗 카카오 내비
                </button>
                <button
                  onClick={() => window.open(`https://map.tmap.co.kr/map/search?searchKeyword=${encodeURIComponent(WEDDING_INFO.wedding.venue)}`, '_blank')}
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
                      {WEDDING_INFO.transportation.subway.map((info, idx) => (
                        <span key={idx}>{info}{idx < WEDDING_INFO.transportation.subway.length - 1 ? <br /> : ''}</span>
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
                      {WEDDING_INFO.transportation.bus.map((info, idx) => (
                        <span key={idx}>{info}{idx < WEDDING_INFO.transportation.bus.length - 1 ? <br /> : ''}</span>
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
                      {WEDDING_INFO.transportation.shuttleBus.map((info, idx) => (
                        <span key={idx}>{info}{idx < WEDDING_INFO.transportation.shuttleBus.length - 1 ? <br /> : ''}</span>
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
                      {WEDDING_INFO.transportation.parking.map((info, idx) => (
                        <span key={idx}>{info}{idx < WEDDING_INFO.transportation.parking.length - 1 ? <br /> : ''}</span>
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
                  {WEDDING_INFO.accounts.groom.map((account, idx) => (
                    <p key={idx}>{account.title}: {account.bank} {account.account} ({account.owner})</p>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl overflow-hidden">
                <div className="py-4 px-6 text-sm font-semibold text-stone-700">
                  신부측 계좌번호
                </div>
                <div className="px-6 pb-4 space-y-2 text-sm text-stone-600">
                  {WEDDING_INFO.accounts.bride.map((account, idx) => (
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
