import { DEFAULT_WEDDING_INFO } from '../config/defaultWedding';
import type { WeddingInfo } from '../types/wedding';

type RawWeddingInfo = Omit<WeddingInfo, 'invitation_message'> & {
  invitation_message?:
    | string
    | {
        line1?: string;
        line2?: string;
        line3?: string;
        line4?: string;
      };
};

function normalizeInvitationMessage(message: RawWeddingInfo['invitation_message']): string {
  if (!message) return '';
  if (typeof message === 'string') return message;

  return [message.line1, message.line2, message.line3, message.line4]
    .filter((line): line is string => Boolean(line))
    .join('\n\n');
}

function parseWeddingJson(raw: string | undefined): WeddingInfo | null {
  if (!raw?.trim()) return null;
  try {
    const parsed = JSON.parse(raw) as RawWeddingInfo;

    return {
      ...parsed,
      invitation_message: normalizeInvitationMessage(parsed.invitation_message),
    };
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
