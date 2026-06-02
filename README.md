### 결혼 청첩장 (findeet-kr)

## 실행
```bash
yarn install
yarn dev
```
로컬: http://localhost:5173

배포: https://bung428.github.io/findeet-kr/

## 웨딩 데이터 설정 (개인정보는 git에 올리지 않기)

청첩장 문구·일정·계좌 등은 **`.env` 또는 `public/wedding.json`** 에 넣습니다. 둘 다 `.gitignore` 대상이라 저장소에는 올라가지 않습니다.

### 로컬 개발
1. `.env.example` 을 복사해 `.env` 작성  
   또는 `public/wedding.example.json` 을 복사해 `public/wedding.json` 작성  
2. `.env` 사용 시: `npm run sync:wedding` 으로 `public/wedding.json` 생성 가능

로드 순서: `.env` (`VITE_WEDDING_INFO`) → `public/wedding.json` → 기본값

### GitHub Pages 배포 (비밀 유지)
GitHub 저장소 **Settings → Secrets and variables → Actions** 에서:

- 이름: `WEDDING_JSON`
- 값: `.env` 의 `VITE_WEDDING_INFO=` 뒤 JSON **전체** (한 줄 JSON 그대로)

등록 후 `main` 에 push 하면 Actions 가 `public/wedding.json` 을 만들어 배포합니다.

```bash
# 로컬 .env 내용을 시크릿으로 등록 (gh CLI)
node -e "const l=require('fs').readFileSync('.env','utf8').match(/^VITE_WEDDING_INFO=(.+)$/m); if(l) process.stdout.write(l[1].trim())" | gh secret set WEDDING_JSON
```

## 작업 위치
- UI/문구: `src/App.tsx`
- 지도 링크: `src/utils/mapLinks.ts`
