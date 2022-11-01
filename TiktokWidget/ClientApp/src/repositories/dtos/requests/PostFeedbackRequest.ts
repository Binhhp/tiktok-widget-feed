import { FeedbackStatus } from "../responses/BaseShop";

export default interface PostFeedbackRequest{
    Feedback?: string;
    Status?: FeedbackStatus;
}