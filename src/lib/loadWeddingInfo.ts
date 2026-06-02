import { DEFAULT_WEDDING_INFO } from '../config/defaultWedding';
import type { WeddingInfo } from '../types/wedding';

function parseWeddingJson(raw: string | undefined): WeddingInfo | null {
  if (!raw?.trim()) return null;
  try {
    return JSON.parse(raw) as WeddingInfo;
  } catch (e) {
    console.error('Failed to parse wedding JSON:', e);
    return null;
  }
}

/** 로컬 .env(VITE_WEDDING_INFO) 또는 배포용 public/wedding.json 에서 데이터 로드 */
export async function loadWeddingInfo(): Promise<WeddingInfo> {
  const fromEnv = parseWeddingJson(import.meta.env.VITE_WEDDING_INFO);
  if (fromEnv) return fromEnv;

  const configUrl = `${import.meta.env.BASE_URL}wedding.json`;
  try {
    const response = await fetch(configUrl);
    if (response.ok) {
      const fromFile = parseWeddingJson(await response.text());
      if (fromFile) return fromFile;
    }
  } catch (e) {
    console.error('Failed to load wedding.json:', e);
  }

  return DEFAULT_WEDDING_INFO;
}
