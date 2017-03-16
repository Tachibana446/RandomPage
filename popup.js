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
    var i = 0;
    GetDomains(function(domains) {
        var select = $('select#select_domain');
        for (domain of domains) {
            var opt = $(`<option value="${i}">${domain}</option>`);
            select.append(opt);
            i++;
        }
    });
    $("#randomButton").click(function() {
        GetDomains(function(domains) {
            var index = $('select#select_domain').val();
            if (index >= 0 && index < domains.length) {
                GetRandom(domains[index], function(data) {
                    $('#link').attr({
                        href: data.url
                    });
                    $('#link').text(data.title);
                });
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
