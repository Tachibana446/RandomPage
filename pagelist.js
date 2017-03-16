$(function() {
    chrome.storage.sync.get("arr", function(value) {
        var obj = {};
        if (value.arr) obj = value.arr;
        var mainDiv = $("#segments");
        //ドメインごと
        for (domain of Object.keys(obj)) {
            var list = [];
            if (obj[domain]) list = obj[domain];
            if (list == [] || list.length == 0) continue;
            var segments = $('<div class="ui segments">');
            var header = $(`<h2 class="ui attached header">${domain} (${list.length}個)</h2>`);
            segments.append(header);
            var toggleDiv = $('<div>'); // トグルで表示非表示するためのdiv
            header.bind("click", {
                div: toggleDiv
            }, Toggle);
            segments.append(toggleDiv);

            // ドメインごとのURLとタイトルのオブジェクト
            for (urlAndTitle of list) {
                var div = $('<div class="ui attached segment">');
                var link = $(`<a href="${urlAndTitle.url}">${urlAndTitle.title}</a>`);
                div.append(link);
                // 削除ボタン
                var removeButton = $('<button class="ui button">削除</button>');
                removeButton.bind("click", {
                    data: urlAndTitle
                }, removeUrl);
                div.append(removeButton);

                toggleDiv.append(div);
            }
            mainDiv.append(segments);
        }
    });
});

function removeUrl(event) {
    var data = event.data.data;
    RemoveUrl(data.url, "arr", function() {
        location.reload();
    });
}

function Toggle(event) {
    var div = event.data.div;
    div.toggle(200);
}
