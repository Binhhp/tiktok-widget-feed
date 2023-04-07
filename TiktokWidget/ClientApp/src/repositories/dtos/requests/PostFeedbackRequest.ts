import { FeedbackStatus } from "../responses/ShopResponse";

export default interface PostFeedbackRequest {
  Feedback?: string;
  Status?: FeedbackStatus;
}
