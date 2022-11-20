export interface IAnalytics {
  impression?: {
    value: number;
    analysisIndicator: number;
    status: StatusAnalystic;
  };
  clicks?: {
    value: number;
    analysisIndicator: number;
    status: StatusAnalystic;
  };
  conversationRate?: {
    value: number;
    analysisIndicator: number;
    status: StatusAnalystic;
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

export enum StatusAnalystic {
  Up,
  Down,
  NoChange,
}
