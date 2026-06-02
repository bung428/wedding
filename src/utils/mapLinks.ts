function buildPlaceQuery(venue: string, address: string) {
  return `${venue} ${address}`.trim();
}

export function openNaverMap(venue: string) {
  window.open(
    `https://map.naver.com/v5/search/${encodeURIComponent(venue)}`,
    '_blank',
    'noopener,noreferrer',
  );
}

export function openKakaoMap(venue: string) {
  window.open(
    `https://map.kakao.com/?q=${encodeURIComponent(venue)}`,
    '_blank',
    'noopener,noreferrer',
  );
}

/** map.tmap.co.kr 은 종료됨. 모바일은 앱 딥링크, PC는 tmap.co.kr 길안내 검색 */
export function openTmap(venue: string, address: string) {
  const query = encodeURIComponent(buildPlaceQuery(venue, address));
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `tmap://search?name=${query}`;
    return;
  }

  window.open(
    `https://tmap.co.kr/navi/navigation?searchname=${query}`,
    '_blank',
    'noopener,noreferrer',
  );
}
