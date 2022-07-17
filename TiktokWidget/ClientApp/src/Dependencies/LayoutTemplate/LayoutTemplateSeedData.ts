import { ImageStorage } from "assets/images/ImageStorage";
import { IVideoTemplateModel, ITikTokVideoDto } from "./LayoutTemplateModel";
import { TemplateType } from "./LayoutTemplateType";

export class TemplateSeedData {
  static Seeder(templateType: TemplateType): Promise<IVideoTemplateModel> {
    switch (templateType) {
      case TemplateType.Slider:
        return Promise.resolve({
          data: [
            ...slider,
            ...slider,
            ...slider,
            ...slider,
            ...slider,
            ...slider,
            ...slider,
          ],
          count: slider.length,
        });
      case TemplateType.Carousel:
        return Promise.resolve({
          data: [
            ...carousel,
            ...carousel,
            ...carousel,
            ...carousel,
            ...carousel,
            ...carousel,
          ],
          count: carousel.length,
        });
      case TemplateType.List:
        return Promise.resolve({
          data: [
            ...list,
            ...list,
            ...list,
            ...list,
            ...list,
            ...list,
            ...list,
            ...list,
            ...list,
          ],
          count: list.length,
        });
      default:
        return Promise.resolve({
          data: [
            ...masonry,
            ...masonry,
            ...masonry,
            ...masonry,
            ...masonry,
            ...masonry,
            ...masonry,
          ],
          count: masonry.length,
        });
    }
  }
}

const slider: ITikTokVideoDto[] = [
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template1,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template2,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template3,
      width: 300,
      height: 300,
    },
    author: "someone",
    authorStats: {
      heartCount: 0,
    },
    stats: {
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template4,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template5,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
];

const carousel: ITikTokVideoDto[] = [
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template3,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template2,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template1,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template4,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template5,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
];

const list: ITikTokVideoDto[] = [
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template2,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template3,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template1,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template4,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template5,
      width: 300,
      height: 300,
    },
    author: "someone",
    stats: {
      diggCount: 0,
      commentCount: 0,
    },
    createTime: "1649667782",
  },
];

const masonry: ITikTokVideoDto[] = [
  {
    desc: "Magic trick finally revealed.",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template3,
      width: 300,
      height: 300,
    },
    author: "someone",
    authorStats: {
      heartCount: 0,
    },
    stats: {
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪....",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template2,
      width: 300,
      height: 300,
    },
    author: "someone",
    authorStats: {
      heartCount: 0,
    },
    stats: {
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template1,
      width: 300,
      height: 300,
    },
    author: "someone",
    authorStats: {
      heartCount: 0,
    },
    stats: {
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template4,
      width: 300,
      height: 300,
    },
    author: "someone",
    authorStats: {
      heartCount: 0,
    },
    stats: {
      commentCount: 0,
    },
    createTime: "1649667782",
  },
  {
    desc: "Magic trick finally revealed. Comment if you found it too 🤪",
    textExtra: [
      {
        hashtagName: "travel_gals",
      },
      {
        hashtagName: "challenge",
      },
      {
        hashtagName: "magic",
      },
      {
        hashtagName: "tiktokguru",
      },
      {
        hashtagName: "hi2021",
      },
      {
        hashtagName: "travel",
      },
    ],
    video: {
      originCover: ImageStorage.Template.Template5,
      width: 300,
      height: 300,
    },
    author: "someone",
    authorStats: {
      heartCount: 0,
    },
    stats: {
      commentCount: 0,
    },
    createTime: "1649667782",
  },
];
