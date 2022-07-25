import axios from "axios";
import { IErrorMessage } from "common/interfaces/IErrorMessage";
import { IQueryModel } from "common/interfaces/IQueryModel";
import config from "config";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";

const instance = axios.create({
  baseURL: config.apiUrl,
});

const FetchDataFromServer = async (req: IQueryModel): Promise<BaseResponse> => {
  let result = new BaseResponse();
  try {
    const response = await instance({
      method: req.method,
      data: req.body,
      url: req.url,
    });
    result = new BaseResponse(true, response.data);
  } catch (err: any) {
    const errors = err.response?.data as IErrorMessage;
    result = new BaseResponse(false, null, errors.errors[0].errorMessage);
  }
  return Promise.resolve(result);
};

export { FetchDataFromServer };
