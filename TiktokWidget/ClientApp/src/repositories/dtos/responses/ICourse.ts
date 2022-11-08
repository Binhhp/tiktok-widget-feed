export interface ICourseItem {
  image?: string;
  title: string;
  description: string;
  url: string;
  status?: boolean;
  ordering?: string;
  createdTime?: string;
  id: string;
}
export interface ICourseResponse {
  '@odata.context': string;
  value?: ICourseItem[];
}
