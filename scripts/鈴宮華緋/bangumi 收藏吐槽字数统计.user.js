// ==UserScript==
// @name         bangumi 收藏吐槽字数统计
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  bangumi 收藏吐槽字数统计,显示目前输入字数，防止字数超出。
// @author       鈴宮華緋
// @include      /https?:\/\/(bgm\.tv|bangumi\.tv|chii\.in)\/subject\/.*/
// ==/UserScript==

(function() {
    let p = $("<p>");
    $("#comment").before(p);
    $("#comment").on("input propertychange", function() {
        showtext();
    });
    showtext();
    function showtext() {
        let length = $("#comment").val().length;
        let text = length + "/200";
        p.text(text);
        p.css({
            "color" : "blue",
            "text-size" : "15px"
        });
        if (length > 200) {
            p.css({
                color : "red"
            });
        } else {
            p.css({
                color : "blue"
            });
        }
    }
})();