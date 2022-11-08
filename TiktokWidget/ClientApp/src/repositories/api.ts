import { axiosInstance } from 'utils/fetcher';
import { IBannerResponse } from './dtos/responses/IBanner';
import { ICourseResponse } from './dtos/responses/ICourse';
import { Response } from './dtos/responses/response';

export const getRecentCourses = (): Response<ICourseResponse> => {
  return axiosInstance.get('/odata/Courses');
};

export const getPosts = (): Response<ICourseResponse> => {
  return axiosInstance.get('/odata/Posts');
};

export const getBanners = (): Response<IBannerResponse> => {
  return axiosInstance.get('/odata/Banner');
};
