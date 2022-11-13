import { convertShortDate } from 'ui-components/DateRange';
import { axiosInstance } from 'utils/fetcher';
import { IAnalyticsResponse } from './dtos/responses/IAnalytics';
import { IBannerResponse } from './dtos/responses/IBanner';
import { ICourseResponse } from './dtos/responses/ICourse';
import { IPostResponse } from './dtos/responses/IPost';
import { Response } from './dtos/responses/response';

export const getRecentCourses = (): Response<ICourseResponse> => {
  return axiosInstance.get('/odata/Courses');
};

export const getPosts = (
  startDate = '2022-11-03 10:21:11.8899610',
  endDate = '2022-11-06 10:21:11.8898013',
): Response<IPostResponse> => {
  return axiosInstance.get(
    `/odata/Posts?startTime=${convertShortDate(
      startDate,
    )}&endTime=${convertShortDate(endDate)}`,
  );
};

export const getBanners = (): Response<IBannerResponse> => {
  return axiosInstance.get('/odata/Banner');
};

export const fetchDataAnalytics = (
  shop: string,
  dateRange: {
    StartTime: string;
    EndTime: string;
  },
): Response<IAnalyticsResponse> => {
  return axiosInstance.post(`/odata/Shops('${shop}')/Analytics`, {
    StartTime: convertShortDate(dateRange.StartTime),
    EndTime: convertShortDate(dateRange.EndTime),
  });
};
