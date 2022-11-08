export interface IPost {
  image?: string;
  title: string;
  description: string;
  url: string;
  status?: boolean;
  ordering?: string;
  createdTime?: string;
  id: string;
}
export interface IPostResponse {
  '@odata.context': string;
  value?: IPost[];
}
