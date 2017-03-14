$(function() {
    chrome.storage.sync.get("arr", function(value) {
        var list = [];
        if (value.arr) {
            list = value.arr;
        }
        var ul = $("ul");
        for (data of list) {
            var div = $('<div class="item">');
            var item = $("<li>");
            var link = $("<a>");
            var url = typeof(data) == "string" ? data : data.url;
            link.attr("href", url);
            var title = typeof(data) == "string" ? data : data.title;
            link.text(title);
            item.append(link);
            div.append(item);
            var removeButton = $('<button class="ui button">削除</button>');
            removeButton.bind("click", {
                data: data
            }, removeUrl);
            div.append(removeButton);
            ul.append(div);
        }
    });
});

function removeUrl(event) {
    var data = event.data.data;
    chrome.storage.sync.get("arr", function(value) {
        var list = [];
        if (value.arr) list = value.arr;
        var removedList = list.filter(function(v) {
            if (typeof(data) == "string")
                return v != data;
            else
                return v.url != data.url;
        });
        chrome.storage.sync.set({
            arr: removedList
        });
    });
    location.reload();
}
