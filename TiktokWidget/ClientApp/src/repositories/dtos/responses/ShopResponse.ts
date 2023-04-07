export interface ShopResponse {
  id: number;
  shopID?: number;
  domain?: string;
  email?: string;
  token?: string;
  stepSetup?: number;
  currency?: string;
  getData?: boolean;
  status?: number;
  confirmUrl?: string;
  trialDay?: number;
  chargeId?: number;
  installedDate?: number;
  phone?: string;
  email2?: string;
  country?: string;
  planName?: string;
  shopDescriptor?: ShopDescriptor;
  shopConfiguration?: ShopConfiguration;
}

export interface ShopConfiguration {
  shopId: number;
  timezone: string;
}
export interface ShopDescriptor {
  id: string;
  shopOwner?: string;
  feedback?: string;
  feedbackStatus?: FeedbackStatus;
  shopId: number;
}

export enum FeedbackStatus {
  Good,
  Bad,
}
