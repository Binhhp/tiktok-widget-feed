import { ICloneStore } from "common/interfaces/ICloneStore";
import { ITikTokVideoDto } from "Dependencies/LayoutTemplate/LayoutTemplateModel";
import { IItemActive } from "./model";

export interface IUserInformation {
  followerCount?: number;
  followingCount?: number;
  avatarThumb?: string;
  diggCount?: number;
  author?: string;
}

export class TemplateStoreModelDto {
  items: ITikTokVideoDto[];
  index?: IItemActive;
  pageIndex: number;
  count: number;
  user?: IUserInformation;
  id: string;
  constructor() {
    this.items = [];
    this.index = {
      active: false,
      realIndex: 0,
    };
    this.pageIndex = 1;
    this.count = 0;
    this.id = "";
  }
}

export class TemplateStoreModel implements ICloneStore<TemplateStoreModel> {
  protected _items: ITikTokVideoDto[];
  protected _index: IItemActive;
  protected _pageIndex: number;
  protected _count: number;
  protected _user?: IUserInformation;
  protected _id: string;
  constructor(_dto?: TemplateStoreModelDto) {
    this._items = _dto?.items ?? [];
    this._index = _dto?.index ?? {
      active: false,
      realIndex: 0,
    };
    this._pageIndex = _dto?.pageIndex ?? 1;
    this._count = _dto?.count ?? 0;
    this._user = _dto?.user;
    this._id = _dto?.id ?? "";
  }

  public get id(): string {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get user(): IUserInformation | undefined {
    return this._user;
  }

  public set user(v: IUserInformation | undefined) {
    this._user = v;
  }

  public get count(): number {
    return this._count;
  }

  public set count(v: number) {
    this._count = v;
  }

  public get pageIndex(): number {
    return this._pageIndex;
  }

  public set pageIndex(v: number) {
    this._pageIndex = v;
  }

  public get index(): IItemActive {
    return this._index;
  }

  public set index(v: IItemActive) {
    this._index = v;
  }

  public get items(): ITikTokVideoDto[] {
    return this._items;
  }

  public set items(v: ITikTokVideoDto[]) {
    this._items = v;
  }
  Clone(): TemplateStoreModel {
    let dto = this.ToDto();
    return new TemplateStoreModel(dto);
  }

  ToDto(): TemplateStoreModelDto {
    return {
      items: this._items,
      index: this._index,
      pageIndex: this._pageIndex,
      count: this.count,
      user: this._user,
      id: this._id,
    };
  }
}
