export interface IErrorMessage {
    errors: IErrorDetail[];
    statusCode: number;
    success: boolean;
}

export interface IErrorDetail{
    errorCode: string;
    errorMessage: string;
}