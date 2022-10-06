import apps from "./apps";
import buttonWidget from "./button";
import dashboard from "./dashboard";
import instagram from "./instagram";
import { IMenuItems } from "./MenuModel";
import tikTok from "./tiktok";
export default class MenuManagement {
  items: IMenuItems[];
  constructor() {
    this.items = [dashboard, tikTok, instagram, buttonWidget, apps];
    // this.items = [tikTok, buttonWidget, apps];
  }
}
