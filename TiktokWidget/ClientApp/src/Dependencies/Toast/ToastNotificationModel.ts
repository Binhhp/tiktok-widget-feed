export interface IToastNotify {
  loading: string;
  success: (data: any) => string;
}

export interface IToastContainer {
  message: string;
  style?: any;
  id?: string;
  className?: string;
}
