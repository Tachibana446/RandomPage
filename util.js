// ドメイン名を取得
function GetDomainName(url) {
    // スラッシュの数
    var sCount = url.split('/').length - 1;
    // スラッシュが二個以下ならそれはそのままドメイン名
    if (sCount <= 2) {
        var res = url.match(new RegExp("(https?://)?(.*)"));
        if (res == null) return "";
        return res[2];
    } else {
        var reg = new RegExp("(https?://)?(.*?)/");
        var res = url.match(reg);
        if (res == null) return "";
        return res[2];
    }
}

// サイトが登録済みかどうか
function HasSite(array, url) {
    var domain = GetDomainName(url);
    // 文字列が空なら含まれているとして扱う
    if (url == "" || domain == "") return true;
    if (array[domain] == null) return false;
    return (array[domain].filter(function(v) {
        return v.url == url;
    }).length > 0);
}

// リストから削除
// keyNameは指定しなければ"arr"
function RemoveUrl(url, keyName, callback) {
    keyName = keyName || "arr";
    var domain = GetDomainName(url);
    chrome.storage.sync.get(keyName, function(value) {
        debugger;

        var list = [];
        if (value[keyName][domain]) list = value[keyName][domain];
        list = list.filter(function(v) {
            return v.url != url;
        });
        value[keyName][domain] = list;
        chrome.storage.sync.set({
            keyName: value[keyName]
        }, callback);
    });
}
