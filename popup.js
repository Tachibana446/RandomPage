$(function() {
    $("#debug").click(function() {
        console.log("click1");
        var array = ["a", "b", "c"];
        chrome.storage.sync.set({
            "debug": array
        }, function() {});
    });

    $("#debug2").click(function() {
        console.log("click2");
        chrome.storage.sync.get("debug", function(value) {
            console.table(value);
        });
    });
});
