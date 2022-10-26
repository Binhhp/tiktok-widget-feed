using System;
using System.Collections.Generic;
using System.Linq;

namespace TiktokWidget.Service.ViewModels
{
    public static class InstagramVideoSeedData
    {
        public static List<string> Images = new List<string>
        {
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle1.png?alt=media&token=7e7c8beb-aedc-4b6b-b5fb-09e76f979580",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle2.png?alt=media&token=56a74a94-b6a3-45f2-9331-d64f4ef64fc5",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle3.png?alt=media&token=7ae26410-6d12-4d65-83cc-bcbe532c5bb2",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle4.png?alt=media&token=47f0f761-43d4-4cba-8f2d-499661ff14e7",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle5.png?alt=media&token=3b754450-c13a-42f7-b5d2-80dabdd60525",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle6.png?alt=media&token=23eb4c84-4bf4-4d78-964b-5d77fe4d8db2",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle7.png?alt=media&token=366297b3-cb32-47e6-9992-a514ffeecda7",
            "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/Rectangle8.png?alt=media&token=c7c1371a-4bd5-4d33-a9e8-0bc5a8b1f42b"
        };
        public static IQueryable<InstagramViewModel> Seed()
        {
            var result = new List<InstagramViewModel>();
            for(var i = 0; i < 16; i++)
            {
                var entity = new InstagramViewModel
                {
                    author = "lq.haitu",
                    stats = new Stats
                    {
                        commentCount = (new Random()).Next(0, 100000),
                        diggCount = (new Random()).Next(0, 100000),
                        playCount = (new Random()).Next(0, 100000),
                        shareCount = (new Random()).Next(0, 100000),
                    },
                    id = Guid.NewGuid().ToString(),
                    officalItem = true,
                    showAs = i % 2 == 0 ? ItemShowAs.MultipleImage : i % 3 == 0 ? ItemShowAs.Video : ItemShowAs.SingleImage,
                    createTime = DateTime.Now,
                    desc = "The NOMATIC x @petermckinnon Everyday Camera Line Kickstarter campaign officially ends TONIGHT at 7:00 PM MDT! Just a few hours left to pre-order the all new McKinnon Everyday Camera Line with our Kickstarter-exclusive pricing. Link in bio or send us a DM with any questions."
                };
                if (i < 8)
                {
                    entity.image = Images[i];
                }
                else
                {
                    entity.image = Images[i - 8];
                }
                result.Add(entity);
            }
            return result.AsQueryable();
        }
    }
    public class InstagramViewModel
    {
        public string id { get; set; }
        public ItemShowAs showAs { get; set; }
        public string desc { get; set; }
        public DateTime createTime { get; set; }
        public string author { get; set; }
        public bool officalItem { get; set; }
        public Stats stats { get; set; }
        public string image { get; set; }
    }

    public enum ItemShowAs
    {
        SingleImage,
        MultipleImage,
        Video
    }

    public class Stats
    {
        public int diggCount { get; set; }
        public int shareCount { get; set; }
        public int commentCount { get; set; }
        public int playCount { get; set; }
    }
}
