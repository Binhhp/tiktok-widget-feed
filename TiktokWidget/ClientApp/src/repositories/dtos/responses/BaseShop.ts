export interface BaseShop {
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
}
