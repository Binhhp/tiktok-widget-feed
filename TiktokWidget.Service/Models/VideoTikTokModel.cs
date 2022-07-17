using System;
using System.Collections.Generic;
using System.Text;

namespace TiktokWidget.Service.Models
{
    public class VideoTikTokModel
    {
        public string id { get; set; }
        public string desc { get; set; }
        public string createTime { get; set; }
        public VideoDetail video { get; set; }
        public string author { get; set; }
        public MusicDetail music { get; set; } 
        public IEnumerable<Challenges> challenges { get; set; }
        public Stats stats { get; set; }
        public IEnumerable<TextExtra> textExtra { get; set; }
        public DuetInfo duetInfo { get; set; }
        public object warnInfo { get; set; }
        public string secret { get; set; }
        public bool forFriend { get;set; }
        public bool digged { get; set; }
        public int itemCommentStatus { get; set; }
        public bool showNotPass { get; set; }
        public bool vl1 { get; set; }
        public int takeDown { get; set; }
        public bool itemMute { get; set; }
        public object effectStickers { get; set; }
        public AuthorStats authorStats { get; set; }
        public bool privateItem { get; set; }
        public bool duetEnabled { get; set; }
        public bool stitchEnabled { get; set; }
        public object stickersOnItem { get; set; }
        public bool isAd { get; set; }
        public bool shareEnabled { get; set; }
        public object comments { get; set; }
        public int duetDisplay { get; set; }
        public int stitchDisplay { get; set; }
        public bool indexEnabled { get; set; }
        public IEnumerable<string> diversificationLabels { get; set; }
        public bool adAuthorization { get; set; }
        public int adLabelVersion { get; set; }
        public string nickname { get; set; }
        public string authorId { get; set; }
        public string authorSecId { get; set; }
        public string avatarThumb { get; set; }
    }
    public class TextExtra
    {
        public string awemeId { get; set; }
        public int start { get; set; }
        public int end { get; set; }
        public string hashtagName { get; set; }
        public string hashtagId { get; set; }
        public int type { get; set; }
        public string userId { get; set; }
        public bool isCommerce { get; set; }
        public string userUniqueId { get; set; }
        public string secUid { get; set; }
        public int subType { get; set; }
    }
    public class MusicDetail
    {
        public string id { get; set; }
        public string title { get; set; }
        public string playUrl { get; set; }
        public string coverLarge { get; set; }
        public string coverMedium { get; set; }
        public string coverThumb { get; set; }
        public string authorName { get; set; }
        public bool original { get; set; }
        public int duration { get; set; }
        public string album { get; set; }
        public int scheduleSearchTime { get; set; }
    }
    public class AuthorStats
    {
        public int followerCount { get; set; }
        public int followingCount { get; set; }
        public int heart { get; set; }
        public int heartCount { get; set; }
        public int videoCount { get; set; }
        public int diggCount { get; set; }
    }
    public class VideoDetail
    {
        public string id { get; set; }
        public string height { get; set; }
        public string width { get; set; }
        public string duration { get; set; }
        public string ratio { get; set; }
        public string cover { get; set; }
        public string originCover { get; set; }
        public string dynamicCover { get; set; }
        public string playAddr { get; set; }
        public string downloadAddr { get; set; }
        public IEnumerable<string> shareCover { get; set; }
        public string reflowCover { get; set; }
        public int bitrate { get; set; }
        public string encodedType { get; set; }
        public string format { get; set; }
        public string videoQuality { get; set; }
        public string encodeUserTag { get; set; }
        public string codecType { get; set; }
        public string definition { get; set; }
        public object subtitleInfos { get; set; }
    }

    public class Challenges
    {
        public string id { get; set; }
        public string title { get; set; }
        public string desc { get; set; }
        public string profileLarger { get; set; }
        public string profileMedium { get; set; }
        public string profileThumb { get; set; }
        public string coverLarger { get; set; }
        public string coverMedium { get; set; }
        public string coverThumb { get; set; }
        public bool isCommerce { get; set; }
        public StatChallenges stats { get; set; }
    }

    public class StatChallenges
    {
        public int videoCount { get; set; }
        public int viewCount { get; set; }
    }

    public class Stats
    {
        public int? diggCount { get; set; }
        public int? shareCount { get; set; }
        public int? commentCount { get; set; }
        public int? playCount { get; set; }
    }
    public class DuetInfo
    {
        public string duetFromId { get; set; }
    }
}
