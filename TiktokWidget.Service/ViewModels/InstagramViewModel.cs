﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace TiktokWidget.Service.ViewModels
{
    public static class InstagramVideoSeedData
    {
        public static IQueryable<InstagramViewModel> Seed()
        {
            var result = new List<InstagramViewModel>();
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "begin again @dior #dior #denisdang #springsummer",
                images = new List<string> 
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F1.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });

            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "for @lofficielvietnamofficial with @labels.men.official @jw_anderson",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F2.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });

            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "một chín hồi đó",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F3.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
                video = "https://v16-webapp.tiktok.com/2197a88d17b1d1125ac5780ceb0c9423/636176ba/video/tos/useast2a/tos-useast2a-pve-0037-aiso/29f7ac32c59b4fb584d6bf6ce5854c65/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1894&bt=947&cs=0&ds=3&ft=kLO5qy-gZmo0PECjQBkVQNiBDiHKJdmC0&mime_type=video_mp4&qs=0&rc=ODNpOzM1Zmk5ZjM2ZzpkNEBpamx4Njg6ZjdsZjMzZjgzM0AwMTQ0LTEtXzYxNC5fNDFjYSNhX2ZrcjQwYGNgLS1kL2Nzcw%3D%3D&l=202211011342240102451582250206530D&btag=80000"
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "khi về nhà vẫn là em bé",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F4.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
                video = "https://v16-webapp.tiktok.com/2197a88d17b1d1125ac5780ceb0c9423/636176ba/video/tos/useast2a/tos-useast2a-pve-0037-aiso/29f7ac32c59b4fb584d6bf6ce5854c65/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1894&bt=947&cs=0&ds=3&ft=kLO5qy-gZmo0PECjQBkVQNiBDiHKJdmC0&mime_type=video_mp4&qs=0&rc=ODNpOzM1Zmk5ZjM2ZzpkNEBpamx4Njg6ZjdsZjMzZjgzM0AwMTQ0LTEtXzYxNC5fNDFjYSNhX2ZrcjQwYGNgLS1kL2Nzcw%3D%3D&l=202211011342240102451582250206530D&btag=80000"
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "🍑",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F5.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F6.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F3.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F2.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F7.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F7.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F8.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F9.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
                video = "https://v16-webapp.tiktok.com/2197a88d17b1d1125ac5780ceb0c9423/636176ba/video/tos/useast2a/tos-useast2a-pve-0037-aiso/29f7ac32c59b4fb584d6bf6ce5854c65/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1894&bt=947&cs=0&ds=3&ft=kLO5qy-gZmo0PECjQBkVQNiBDiHKJdmC0&mime_type=video_mp4&qs=0&rc=ODNpOzM1Zmk5ZjM2ZzpkNEBpamx4Njg6ZjdsZjMzZjgzM0AwMTQ0LTEtXzYxNC5fNDFjYSNhX2ZrcjQwYGNgLS1kL2Nzcw%3D%3D&l=202211011342240102451582250206530D&btag=80000"
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F10.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F2.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F3.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F11.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F1.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5",
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F2.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F12.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F13.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F14.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F15.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F16.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                },
                video = "https://v16-webapp.tiktok.com/2197a88d17b1d1125ac5780ceb0c9423/636176ba/video/tos/useast2a/tos-useast2a-pve-0037-aiso/29f7ac32c59b4fb584d6bf6ce5854c65/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=1894&bt=947&cs=0&ds=3&ft=kLO5qy-gZmo0PECjQBkVQNiBDiHKJdmC0&mime_type=video_mp4&qs=0&rc=ODNpOzM1Zmk5ZjM2ZzpkNEBpamx4Njg6ZjdsZjMzZjgzM0AwMTQ0LTEtXzYxNC5fNDFjYSNhX2ZrcjQwYGNgLS1kL2Nzcw%3D%3D&l=202211011342240102451582250206530D&btag=80000"
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F17.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            result.Add(new InstagramViewModel
            {
                author = "imdenisdang",
                createTime = DateTime.Now,
                desc = "with @labels.men.official @jw_anderson at #tiktokfilmfestival",
                images = new List<string>
                {
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-widget.appspot.com/o/test%2F18.jpg?alt=media&token=0689aa9f-24f7-460c-ba05-7860e45007a5"
                },
                officalItem = true,
                id = Guid.NewGuid().ToString(),
                stats = new Stats
                {
                    commentCount = (new Random()).Next(0, 10000000),
                    diggCount = (new Random()).Next(0, 10000000),
                    playCount = (new Random()).Next(0, 10000000),
                    shareCount = (new Random()).Next(0, 10000000)
                }
            });
            return result.AsQueryable();
        }
    }
    public class InstagramViewModel
    {
        public string id { get; set; }
        public string desc { get; set; }
        public DateTime createTime { get; set; }
        public string author { get; set; }
        public bool officalItem { get; set; }
        public Stats stats { get; set; }
        public List<string> images { get; set; }
        public string video { get; set; }
    }

    public class Stats
    {
        public int diggCount { get; set; }
        public int shareCount { get; set; }
        public int commentCount { get; set; }
        public int playCount { get; set; }
    }
}
