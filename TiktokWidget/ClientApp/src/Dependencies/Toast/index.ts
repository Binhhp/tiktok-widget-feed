import toast from "react-hot-toast";
import { BaseResponse } from "repositories/dtos/responses/BaseResponse";
import { IToastContainer, IToastNotify } from "./ToastNotificationModel";

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

  success: (content: IToastContainer): string => {
    return toast.success(content.message, {
      style: content.style,
      id: content.id,
      className: content.className,
    });
  },

  error: (content: IToastContainer): string => {
    return toast.error(content.message, {
      style: content.style,
      id: content.id,
      className: content.className,
    });
  },

  loading: (content: IToastContainer): string => {
    return toast.loading(content.message, {
      style: content.style,
      id: content.id,
      className: content.className,
    });
  },
};
