function Test_GetDomainName() {
    var input = [
        "google.com",
        "http://google.com",
        "https://www.google.com",
        "http://twitter.com/hogehoge",
        "https://twitter.com/hogehoge/123"
    ];
    var expect = [
        "google.com",
        "google.com",
        "www.google.com",
        "twitter.com",
        "twitter.com"
    ];

    for (var i = 0; i < input.length; i++) {
        var result = GetDomainName(input[i]);
        var str = `${i}:${input[i]} => ${result} = ${result == expect[i]}`;
        var p = $('<p>');
        p.text(str);
        $("div#domain").append(p);
    }
}

function Test_HasSite() {
    var input = [
        "http://hoge.com/123", "http://hoge.com/none",
        "https://hoge.com/123", "http://fuga.co.jp/include.html", "http://fuga.co.jp/none.html"
    ];
    var array = {
        "hoge.com": [{
            url: "http://hoge.com/123"
        }],
        "fuga.co.jp": [{
            url: "http://fuga.co.jp/include.html"
        }]
    };
    var expect = [true, false, false, true, false];

    for (var i = 0; i < input.length; i++) {
        var res = HasSite(array, input[i]);
        var str = `${i}:expect:${expect[i]}\tresult:${res}  (${res == expect[i]})`;
        var p = $('<p>');
        p.text(str);
        $("div#has_site").append(p);
    }
}

function Test_RemoveUrl() {
    var data = {
        "hoge.com": [{
            url: "http://hoge.com/123"
        }, {
            url: "http://hoge.com/456"
        }, {
            url: "https://hoge.com/123"
        }]
    };
    var url = "http://hoge.com/123";
    chrome.storage.sync.set({
        debug: data
    }, function() {
        RemoveUrl(url, "debug", function() {
            debugger;
            chrome.storage.sync.get("debug", function(value) {
                console.table(value);
            });
        });
    });
}

$(function() {
    Test_GetDomainName();
    Test_HasSite();
    Test_RemoveUrl();

    chrome.storage.sync.get("arr", function(value) {
        console.table(value);
    });
});
