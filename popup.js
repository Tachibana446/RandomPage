$(function() {
    chrome.storage.sync.get("arr", function(value) {
        if (Object.keys(value).length === 0) {
            value = [];
        } else {
            value = value.arr;
        }
        console.log(value);
        chrome.tabs.getSelected(function(tab) {
            if (value.indexOf(tab.url) == -1) {
                $("#removeButton").prop("disabled", true);
            } else {
                $("#addButton").prop("disabled", true);
            }

            $("#addButton").click(function() {
                value.push({
                    title: tab.title,
                    url: tab.url
                });
                chrome.storage.sync.set({
                    arr: value
                });
                $("#addButton").prop("disabled", true);
                $("#removeButton").prop("disabled", false);
            });
            $("#removeButton").click(function() {
                value = value.filter(function(v) {
                    return v.url != tab.url;
                });
                chrome.storage.sync.set({
                    arr: value
                });
                $("#addButton").prop("disabled", false);
                $("#removeButton").prop("disabled", true);
            });
        });
    });

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

    $("#clearButton").click(function() {
        var res = confirm("すべて削除してよろしいですか？");
        if (res) {
            chrome.storage.sync.set({
                arr: []
            });
            $("#addButton").prop("disabled", false);
        }
    });
});
