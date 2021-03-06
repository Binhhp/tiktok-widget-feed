export interface IVideoTemplateModel {
  data: ITikTokVideoDto[];
  count: number;
}

export interface ITikTokVideoDto {
  id?: string;
  desc?: string;
  createTime?: string;
  scheduleTime?: number;
  video: IVideoDetail;
  author?: string;
  music?: IMusic;
  challenges?: Array<IChallenges>;
  stats?: IStats;
  duetInfo?: IDuetInfo;
  warnInfo?: Array<any>;
  originalItem?: boolean;
  officalItem?: boolean;
  textExtra?: ITextExtra[];
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
  originCover?: string;
  dynamicCover?: string;
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
  diggCount?: number;
  shareCount?: number;
  commentCount?: number;
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
  hashtagName?: string;
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
