import { axiosInstance } from "utils/fetcher";
import { IBannerResponse } from "./dtos/responses/IBanner";
import { ICourseResponse } from "./dtos/responses/ICourse";
import { IPostResponse } from "./dtos/responses/IPost";
import { Response } from "./dtos/responses/response";

export const getRecentCourses = (): Response<ICourseResponse> => {
  return axiosInstance.get("/odata/Courses");
};

export const getPosts = (
  startDate = "2022-11-03 10:21:11.8899610",
  endDate = "2022-11-06 10:21:11.8898013"
): Response<IPostResponse> => {
  return axiosInstance.get(
    `/odata/Posts?startTime=${startDate}&endTime=${endDate}`
  );
};

export const getBanners = (): Response<IBannerResponse> => {
  return axiosInstance.get("/odata/Banner");
};
