export class ChatPlugin {
  static Open() {
    window.$crisp.push(["do", "chat:open"]);
  }

  static Init(domain?: string) {
    const script2 = document.createElement("script");
    script2.innerHTML = `
              window.$crisp=[];window.CRISP_WEBSITE_ID="07faab23-2cce-4034-93cd-5361030881aa";CRISP_TOKEN_ID = btoa("${
                (domain ?? "") + "Tiktok"
              }");
              (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
              $crisp.push(["set", "user:nickname", ["${domain ?? ""}"]]);
              $crisp.push(["set", "session:segments", [["Tiktok"]]]);`;

    document.body.appendChild(script2);
  }
}
