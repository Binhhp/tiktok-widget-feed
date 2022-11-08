export interface IPost {
  image?: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  status?: boolean;
  ordering?: string;
  createdTime?: string;
  id: string;
  impression: number;
  clicks: number;
}
export interface IPostResponse {
  '@odata.context': string;
  value?: IPost[];
}
