$(function() {
    chrome.storage.sync.get("arr", function(value) {
        if (Object.keys(value).length === 0) {
            value = {};
        } else {
            value = value.arr;
        }
        console.log(value);
        chrome.tabs.getSelected(function(tab) {
            if (!HasSite(value, tab.url)) {
                $("#removeButton").prop("disabled", true);
            } else {
                $("#addButton").prop("disabled", true);
            }
            // 追加
            var domain = GetDomainName(tab.url);
            $("#addButton").click(function() {
                if (value[domain] == null) value[domain] = [];
                value[domain].push({
                    title: tab.title,
                    url: tab.url
                });
                chrome.storage.sync.set({
                    arr: value
                });
                $("#addButton").prop("disabled", true);
                $("#removeButton").prop("disabled", false);
            });
            // 削除
            $("#removeButton").click(function() {
                RemoveUrl(tab.url, "arr", null);
                $("#addButton").prop("disabled", false);
                $("#removeButton").prop("disabled", true);
            });
        });
    });
    // ランダム
    $("#randomButton").click(function() {
        chrome.storage.sync.get("arr", function(value) {
            if (Object.keys(value).length !== 0) {
                var index = Math.floor(Math.random() * (value.arr.length + 1));
                $("#link").attr({
                    href: value.arr[index].url
                });
                $("#link").text(value.arr[index].title);
            }
        });
    });
    // すべてクリア
    $("#clearButton").click(function() {
        var res = confirm("すべて削除してよろしいですか？");
        if (res) {
            chrome.storage.sync.set({
                arr: {}
            });
            $("#addButton").prop("disabled", false);
        }
    });
});
