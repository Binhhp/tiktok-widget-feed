import { ICloneStore } from "common/interfaces/ICloneStore";

export class ApplicationStoreModelDto {
  menuItems: string[];
  menuActive: string;
  mobileMenuView: boolean;
  step: number;
  constructor() {
    this.menuItems = [];
    this.menuActive = "";
    this.mobileMenuView = false;
    this.step = 0;
  }
}

export class ApplicationStoreModel
  implements ICloneStore<ApplicationStoreModel>
{
  protected _menuItems: string[];
  protected _menuActive: string;
  protected _mobileMenuView: boolean;
  protected _step: number;
  constructor(_dto?: ApplicationStoreModelDto) {
    this._menuItems = _dto?.menuItems || [];
    this._menuActive =
      _dto?.menuActive || window.location.pathname.replace("/", "");
    this._mobileMenuView = _dto?.mobileMenuView || false;
    this._step = _dto?.step || 0;
  }
  public get step(): number {
    return this._step;
  }

  public set step(v: number) {
    this._step = v;
  }
  public get mobileMenuView(): boolean {
    return this._mobileMenuView;
  }

  public set mobileMenuView(v: boolean) {
    this._mobileMenuView = v;
  }

  public get menuItems(): string[] {
    return this._menuItems;
  }

  public set menuItems(v: string[]) {
    this._menuItems = v;
  }

  public get menuActive(): string {
    return this._menuActive;
  }

  public set menuActive(v: string) {
    this._menuActive = v;
  }

  Clone(): ApplicationStoreModel {
    let dto = this.ToDto();
    return new ApplicationStoreModel(dto);
  }

  ToDto(): ApplicationStoreModelDto {
    return {
      menuItems: this._menuItems,
      menuActive: this._menuActive,
      mobileMenuView: this._mobileMenuView,
      step: this._step,
    };
  }
}
