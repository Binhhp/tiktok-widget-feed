import { IWidget } from "common/interfaces/IWidget";
import { IItemState } from "Dependencies/LayoutTemplate/LayoutTemplateType";

export class DefaultItemProvider {
  public items: IItemState[];
  public widget: IWidget[];
  constructor() {
    this.items = [];
    this.widget = [];
    this.widget.push({
      date: new Date(Date.now()),
      guid: "item-default-a",
      tags: 1,
      title: "Widget A",
    });
    this.widget.push({
      date: new Date(Date.now()),
      guid: "item-default-b",
      tags: 0,
      title: "Widget B",
    });
    this.items.push({
      title: "Tiễn em đi “chống lầy” ",
      comment: 100,
      time: "December 15, 2022",
      hashtag: ["duongthao"],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "U là choy ” ",
      comment: 100,
      time: "December 15, 2022",
      hashtag: ["duongthao", "vietnam airline"],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title:
        "Làm lại chiếc vid triệu view của Nữ Hoàng Ava Max  #avamax #music #lyrics #fyp #xuhuong",
      comment: 100,
      time: "December 15, 2022",
      hashtag: ["xuhuong", "music", "avamax"],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Khó lắm mới chụp được",
      comment: 100,
      time: "December 15, 2022",
      hashtag: [
        "trending",
        "xuhuong",
        "dikhapthegian",
        "guongmatsonggio",
        "mariachallenge",
      ],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Tiễn em đi “chống lầy” ",
      comment: 100,
      time: "December 15, 2022",
      hashtag: ["duongthao"],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Tiễn em đi “chống lầy” ",
      comment: 100,
      time: "December 15, 2022",
      hashtag: ["duongthao"],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
    this.items.push({
      title: "Tiễn em đi “chống lầy” ",
      comment: 100,
      time: "December 15, 2022",
      hashtag: ["duongthao"],
      heart: 100,
      image:
        "https://i.insider.com/5484d9d1eab8ea3017b17e29?width=600&format=jpeg&auto=webp",
    });
  }
}
