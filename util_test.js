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

$(function() {
    Test_GetDomainName();
});
