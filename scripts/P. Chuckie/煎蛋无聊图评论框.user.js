// ==UserScript==
// @name         煎蛋无聊图评论框
// @namespace    http://xbyham.top/jdplk
// @version      0.1
// @description  为煎蛋无聊图的每一个帖子添加一个可以实时评论回复的DISQUS评论框
// @author       西班牙大火腿
// @match        *://jandan.net/pic*
// @license      MIT
// @grant        none
// ==/UserScript==


(function () {
    var d = document, s = d.createElement('script');
    s.src = 'https://jandan.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    $(".tucao-btn").click(function () {
        var n = $(this);
        var m = n.data("id");
        var d = $("#comment-" + m + " #disqus_thread");
        if (d.length > 0) {
            $(d).toggle();
        } else {
            $("#disqus_thread").remove();
            $("#comment-" + m).append("<div class=\"disqus_box\" id=\"disqus_thread\"></div>");
            window.disqus_config = function () {
                this.page.url = document.location.protocol + $("#comment-" + m + " .righttext a").attr("href").replace("#", "?");
                this.page.identifier = 'pic#' + m;
                this.page.title = '无聊图#' + m;
            };
            window.DISQUS.host._loadEmbed();
        }
    });
})();