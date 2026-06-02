### 결혼 청첩장 (wedding)

## 실행
```bash
yarn install
yarn dev
```
로컬: http://localhost:5173

배포: https://bung428.github.io/wedding/

## 웨딩 데이터 설정 (개인정보는 git에 올리지 않기)

청첩장 데이터는 **`public/wedding.json`** 에 있습니다 (배포 시 함께 올라갑니다).

### 로컬에서 수정할 때
1. `.env` 의 `VITE_WEDDING_INFO` 수정 후 `npm run sync:wedding` 실행  
   또는 `public/wedding.json` 을 직접 수정  
2. `git add public/wedding.json` 후 push

로드 순서: `.env` (`VITE_WEDDING_INFO`, 로컬 dev) → `public/wedding.json` → 기본값

## 작업 위치
- UI/문구: `src/App.tsx`
- 지도 링크: `src/utils/mapLinks.ts`
