export const StyledConfig = {
  MARGIN_CONTENT: 7,
};
export interface IVideoTemplateModel {
  data: ITikTokVideoDto[];
  count: number;
}

export interface ITikTokVideoDto {
  id?: string;
  desc?: string; // Show title of video
  createTime?: string; // Show time created
  scheduleTime?: number;
  video: IVideoDetail; //Show Properties
  author?: string; // Show user name
  music?: IMusic;
  challenges?: Array<IChallenges>;
  stats?: IStats; // Show Description Video
  duetInfo?: IDuetInfo;
  warnInfo?: Array<any>;
  originalItem?: boolean;
  officalItem?: boolean; // Show offical user
  textExtra?: ITextExtra[]; // Show hashtag
  secret?: boolean;
  forFriend?: boolean;
  digged?: boolean;
  itemCommentStatus?: number;
  showNotPass?: boolean;
  vl1?: boolean;
  takeDown?: number;
  itemMute?: boolean;
  effectStickers?: Array<any>;
  authorStats?: IAuthorStats;
  privateItem?: boolean;
  duetEnabled?: boolean;
  stitchEnabled?: boolean;
  stickersOnItem?: Array<any>;
  isAd?: boolean;
  shareEnabled?: boolean;
  comments?: Array<any>;
  duetDisplay?: number;
  stitchDisplay?: number;
  indexEnabled?: boolean;
  diversificationLabels?: Array<string>;
  adAuthorization?: boolean;
  adLabelVersion?: number;
  nickname?: string;
  authorId?: string;
  authorSecId?: string;
  avatarThumb?: string;
}

export interface IVideoDetail {
  id?: string;
  height: number;
  width: number;
  duration?: number;
  ratio?: string;
  cover?: string;
  originCover?: string; // Show image
  dynamicCover?: string; // Show hover image
  playAddr?: string;
  downloadAddr?: string;
  shareCover?: Array<string>;
  reflowCover?: string;
  bitrate?: number;
  encodedType?: string;
  format?: string;
  videoQuality?: string;
  encodeUserTag?: string;
  codecType?: string;
  definition?: string;
  subtitleInfos?: Array<any>;
}

export interface IMusic {
  id?: string;
  title?: string;
  playUrl?: string;
  coverLarge?: string;
  coverMedium?: string;
  coverThumb?: string;
  authorName?: string;
  original?: boolean;
  duration?: number;
  album?: string;
  scheduleSearchTime?: number;
}

export interface IChallenges {
  id?: string;
  title?: string;
  desc?: string;
  profileLarger?: string;
  profileMedium?: string;
  profileThumb?: string;
  coverLarger?: string;
  coverMedium?: string;
  coverThumb?: string;
  isCommerce?: boolean;
  stats?: IStatChallenges;
}

export interface IStatChallenges {
  videoCount?: number;
  viewCount?: number;
}

export interface IStats {
  diggCount?: number; // Show likes
  shareCount?: number;
  commentCount?: number; // Show number of comments
  playCount?: number;
}

export interface IDuetInfo {
  duetFromId?: string;
}

export interface ITextExtra {
  awemeId?: string;
  start?: number;
  end?: number;
  hashtagId?: string;
  hashtagName?: string; //Show hashtag name
  type?: number;
  subType?: number;
  userId?: string;
  isCommerce?: boolean;
  userUniqueId?: string;
  secUid?: string;
}

export interface IAuthorStats {
  followerCount?: number;
  followingCount?: number;
  heart?: number;
  heartCount?: number;
  videoCount?: number;
  diggCount?: number;
}

export interface IUserInformation {
  followerCount?: number;
  followingCount?: number;
  avatarThumb?: string;
  diggCount?: number;
  author?: string;
}

export interface IItemActive {
  realIndex: number;
  active: boolean;
}

export interface ITemplateStoreModel {
  items: ITikTokVideoDto[];
  index: IItemActive;
  pageIndex: number;
  count: number | undefined;
  user: IUserInformation;
}
export class TemplateStoreModel implements ITemplateStoreModel {
  items: ITikTokVideoDto[];
  index: IItemActive;
  pageIndex: number;
  count: number | undefined;
  user: IUserInformation;
  constructor() {
    this.items = [];
    this.index = {
      realIndex: 0,
      active: false,
    };
    this.pageIndex = 1;
    this.count = undefined;
    this.user = {};
  }
}
