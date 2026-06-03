import type { WeddingInfo } from '../types/wedding';

export const DEFAULT_WEDDING_INFO: WeddingInfo = {
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
  invitation_message: '',
  accounts: { groom: [], bride: [] },
  transportation: { subway: [], bus: [], shuttleBus: [], parking: [] },
};
