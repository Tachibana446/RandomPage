$(function() {
    chrome.storage.sync.get("arr", function(value) {
        var list = [];
        if (value.arr) {
            list = value.arr;
        }
        var ul = $("ul");
        for (url of list) {
            var div = $('<div class="item">');
            var item = $("<li>");
            var link = $("<a>");
            link.attr("href", url);
            link.text(url);
            item.append(link);
            div.append(item);
            var removeButton = $('<button class="ui button">削除</button>');
            removeButton.bind("click", {
                url: url
            }, removeUrl);
            div.append(removeButton);
            ul.append(div);
        }
    });
});

function removeUrl(event) {
    var url = event.data.url;
    chrome.storage.sync.get("arr", function(value) {
        var list = [];
        if (value.arr) list = value.arr;
        var removedList = list.filter(function(v) {
            return v != url;
        });
        chrome.storage.sync.set({
            arr: removedList
        });
    });
    location.reload();
}
