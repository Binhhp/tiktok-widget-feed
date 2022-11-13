export class UriProvider {
  static InsertParameters(key: string, value: string | number) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    var kvp = document.location.search.substr(1).split("&");
    let i = 0;

    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + "=")) {
        let pair = kvp[i].split("=");
        pair[1] = value;
        kvp[i] = pair.join("=");
        break;
      }
    }

    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join("=");
    }

    // can return this or...
    let params = kvp.join("&");

    // reload page with new params
    document.location.search = params;
  }

  static KeepParameters(url: string) {
    const queryString = window.location.search;
    let urlOutput = new URL(`${window.location.origin}${url}`);
    const paramUrlOutput = urlOutput.searchParams;
    if (queryString) {
      var kvp = queryString.substr(1).split("&");
      let i = 0;

      for (; i < kvp.length; i++) {
        let pair = kvp[i].split("=");
        const key = pair[0];
        const val = pair[1];
        if (!paramUrlOutput.has(key)) {
          urlOutput.searchParams.append(key, val);
        }
      }
      return `${urlOutput.pathname}${urlOutput.search}`;
    }
    return url;
  }
}
