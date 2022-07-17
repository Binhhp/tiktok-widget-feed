import toast from "react-hot-toast";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { IToastNotify } from "./ToastNotificationModel";

export const toastNotify = {
  promise: async (funcQuery: Promise<BaseResponse>, content: IToastNotify) => {
    const toastId = toast.loading(content.loading);
    const res = await funcQuery;
    if (res.Status) {
      toast.success(content.success(res.Data) || content.success, {
        id: toastId,
      });
    } else {
      toast.error(res.Error, {
        id: toastId,
      });
    }
    return res;
  },
};
