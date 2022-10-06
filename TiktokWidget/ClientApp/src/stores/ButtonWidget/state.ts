import { ICloneStore } from "common/interfaces/ICloneStore";

const ButtonPositionInit = {
  top: false,
  bottom: true,
  left: false,
  right: true,
};
export interface IButtonPositionInit {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export class ButtonWidgetStoreModelDto {
  step?: number;
  image?: string;
  position?: IButtonPositionInit;
  userName?: string;
  theme?: string;
  id?: string;
  isEnabled?: boolean;
  timeZone?: string;
  constructor() {
    this.step = 0;
    this.image = "";
    this.position = ButtonPositionInit;
    this.userName = "";
    this.theme = "dawn";
    this.id = "";
  }
}

export class ButtonWidgetStoreModel
  implements ICloneStore<ButtonWidgetStoreModel>
{
  protected _step: number;
  protected _image: string;
  protected _position: IButtonPositionInit;
  protected _userName: string;
  protected _theme: string;
  protected _id: string;
  protected _isEnabled: boolean;
  protected _timeZone: string;
  constructor(_dto?: ButtonWidgetStoreModelDto) {
    this._step = _dto?.step || 0;
    this._image = _dto?.image ?? "";
    this._position = _dto?.position || ButtonPositionInit;
    this._userName = _dto?.userName || "";
    this._theme = _dto?.theme || "dawn";
    this._id = _dto?.id || "";
    this._isEnabled = _dto?.isEnabled || false;
    this._timeZone = _dto?.timeZone || "";
  }
  public get timeZone(): string {
    return this._timeZone;
  }

  public set timeZone(v: string) {
    this._timeZone = v;
  }

  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  public set isEnabled(v: boolean) {
    this._isEnabled = v;
  }
  public get id(): string {
    return this._id;
  }

  public set id(v: string) {
    this._id = v;
  }

  public get theme(): string {
    return this._theme;
  }

  public set theme(v: string) {
    this._theme = v;
  }

  public get userName(): string {
    return this._userName;
  }

  public set userName(v: string) {
    this._userName = v;
  }

  public get position(): IButtonPositionInit {
    return this._position;
  }

  public set position(v: IButtonPositionInit) {
    this._position = v;
  }

  public get image(): string {
    return this._image;
  }

  public set image(v: string) {
    this._image = v;
  }

  public get step(): number {
    return this._step;
  }

  public set step(v: number) {
    this._step = v;
  }
  Clone(): ButtonWidgetStoreModel {
    let dto = this.ToDto();
    return new ButtonWidgetStoreModel(dto);
  }

  ToDto(): ButtonWidgetStoreModelDto {
    return {
      step: this._step,
      image: this._image,
      position: this._position,
      userName: this._userName,
      theme: this._theme,
      id: this._id,
      isEnabled: this._isEnabled,
      timeZone: this._timeZone,
    };
  }
}
