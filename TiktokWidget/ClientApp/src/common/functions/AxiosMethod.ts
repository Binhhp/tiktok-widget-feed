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
  if (localStorage.getItem("timezone")) {
    instance.defaults.headers.common["tz"] = `${localStorage.getItem(
      "timezone"
    )}`;
  }
  try {
    const response = await instance({
      method: req.method,
      data: req.body,
      url: req.url,
    });
    result = new BaseResponse(true, response.data);
  } catch (err: any) {
    const errMessage = err.response?.data as IErrorMessage;
    if (errMessage && errMessage?.errors?.length > 0) {
      result = new BaseResponse(false, null, errMessage.errors[0].errorMessage);
    } else {
      const message = `${err.code}: ${err.message}`;
      result = new BaseResponse(false, null, message);
    }
  }
  return Promise.resolve(result);
};

const FetchDataSwr = (req: IQueryModel) => {
  if (localStorage.getItem("timezone")) {
    instance.defaults.headers.common["tz"] = `${localStorage.getItem(
      "timezone"
    )}`;
  }
  return instance({
    method: req.method,
    data: req.body,
    url: req.url,
  });
};
export { FetchDataFromServer, FetchDataSwr };
