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
