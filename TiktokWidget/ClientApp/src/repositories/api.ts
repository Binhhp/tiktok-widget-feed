import { axiosInstance } from "utils/fetcher";
import { convertShortDate } from "views/Admin/Dashboard/DateRange/DateFunc";
import { IAnalyticsResponse } from "./dtos/responses/IAnalytics";
import { IBannerResponse } from "./dtos/responses/IBanner";
import { ICourseResponse } from "./dtos/responses/ICourse";
import { IPostResponse } from "./dtos/responses/IPost";
import { Response } from "./dtos/responses/response";

export const getRecentCourses = (): Response<ICourseResponse> => {
  return axiosInstance.get("/odata/Courses");
};

export const getPosts = (
  domain: string,
  startDate = new Date().toString(),
  endDate = new Date().toString()
): Response<IPostResponse> => {
  return axiosInstance.get(
    `/odata/Shops('${domain}')/Posts?startTime=${convertShortDate(
      startDate
    )}&endTime=${convertShortDate(endDate)}`
  );
};

export const getBanners = (): Response<IBannerResponse> => {
  return axiosInstance.get("/odata/Banner");
};

export const fetchDataAnalytics = (
  shop: string,
  dateRange: {
    StartTime: string;
    EndTime: string;
  }
): Response<IAnalyticsResponse> => {
  return axiosInstance.post(`/odata/Shops('${shop}')/Analytics`, {
    StartTime: convertShortDate(dateRange.StartTime),
    EndTime: convertShortDate(dateRange.EndTime),
  });
};
