export interface IAnalytics {
  impression?: {
    value: number;
    analysisIndicator: number;
  };
  clicks?: {
    value: number;
    analysisIndicator: number;
  };
  conversationRate?: {
    value: number;
    analysisIndicator: number;
  };
}
export interface IImpression {
  time?: string;
  impression?: string;
  clicks?: string;
}
export interface IAnalyticsResponse {
  analytics?: IAnalytics;
  impression?: IImpression[];
}
