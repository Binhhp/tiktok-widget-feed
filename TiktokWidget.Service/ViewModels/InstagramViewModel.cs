using System.Collections.Generic;

namespace TiktokWidget.Service.ViewModels
{
    public class InstagramViewModel
    {
        public int DimensionWidth { get; set; }
        public int DimensionHeight { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        public string Id { get; set; }
        public string Type { get; set; }
        public string LocationId { get; set; }
        public string LocationName { get; set; }
        public string LocationSlug { get; set; }
        public string ThumbnailUrl { get; set; }
        public string VideoUrl { get; set; }
        public string ImageUrl { get; set; }
        public IEnumerable<string> ImageUrlArr { get; set; }
        public string Description { get; set; }
        public string ShortCode { get; set; }
        public int TakenAt { get; set; }
        public User User { get; set; }
        public IEnumerable<string> HashTag { get; set; }
    }

    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public bool IsPrivate { get; set; }
    }
}
