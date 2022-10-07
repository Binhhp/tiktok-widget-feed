export class ChatPlugin {
  static Open() {
    window.$crisp.push(["do", "chat:open"]);
  }
}
