export interface WeddingAccount {
  title: string;
  bank: string;
  account: string;
  owner: string;
}

export interface WeddingInfo {
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
    groom: WeddingAccount[];
    bride: WeddingAccount[];
  };
  transportation: {
    subway: string[];
    bus: string[];
    shuttleBus: string[];
    parking: string[];
  };
}
