export interface IBannerItem {
  image?: string;
  url: string;
  status?: boolean;
  id: string;
}
export interface IBannerResponse {
  '@odata.context': string;
  value?: IBannerItem[];
}
