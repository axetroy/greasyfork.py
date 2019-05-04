// ==UserScript==
// @name        twitter_instagram_show2
// @namespace   http://catherine.v0cyc1pp.com/twitter_instagram_show2.user.js
// @include     https://twitter.com/*
// @exclude     https://twitter.com/i/cards/*
// @author      greg10
// @license     GPL 3.0
// @run-at      document-start
// @version     2.1
// @connect     www.instagram.com
// @connect     cdninstagram.com
// @connect     fbcdn.net
// @grant       GM_xmlhttpRequest
// @description Show Instagram images on your Twitter time line.（インスタ画像もタイムラインに表示する。）
// ==/UserScript==

function video_proc( elem, videosrc, poster) {
    //console.log("video_proc: videosrc="+videosrc);
    var posterblob = "";
    if (poster) {
        //console.log("poster="+poster);
        GM_xmlhttpRequest({
            method: "GET",
            url: poster,
            responseType: 'blob',
            synchronous: true,
            onload: function(response) {
                posterblob = window.URL.createObjectURL(this.response);
            }
        });
    }
    var vid_container = document.createElement('div');
    var video = document.createElement('video');
    var bg = "#000 url('" + posterblob + "') no-repeat left top cover";
    /*
    $(vid_container).css({
        "margin": "10px 0 0",
        "display": "block",
        "width": "100%",
        "min-height": "280px",
        "height": "auto",
        "background": bg
    });
    */
    vid_container.style.margin = "10px 0 0";
    vid_container.style.display = "block";
    vid_container.style.width = "100%";
    vid_container.style.minHeight = "280px";
    vid_container.style.height = "auto";
    vid_container.style.background = bg;



    /*
    $(video).css({
        "display": "block",
        "width": "100%",
        "height": "auto",
        "max-width": "100%",
        "background-color": "black",
        "white-space": "normal"
    });
    */
    video.style.display = "block";
    video.style.width = "100%";
    video.style.height = "auto";
    video.style.maxWidth = "100%";
    video.style.backgroundColor = "black";
    video.style.whiteSpace = "normal";


    //elem.parent().append(vid_container);
    elem.parentNode.appendChild(vid_container);
    GM_xmlhttpRequest({
        method: "GET",
        url: videosrc,
        responseType: 'blob',
        synchronous: true,
        onload: function(response) {
            video.onload = function(e) {
                window.URL.revokeObjectURL(video.src);
            };
            video.src = window.URL.createObjectURL(this.response);
            /*
            $(video).attr("type", "video/mp4");
            $(video).attr("poster", posterblob);
            $(video).attr('controls', 'controls');
            $(video).attr('preload', 'auto');
            $(video).attr('playsinline', 'playsinline');
            $(vid_container).append(video);
            $(video).load();
            */
            video.setAttribute( "type", "video/mp4");
            video.setAttribute( "poster", posterblob);
            video.setAttribute( "controls", 'controls');
            video.setAttribute( "preload", 'auto');
            video.setAttribute( "playsinline", 'playsinline');
            vid_container.appendChild(video);
            video.load();

            window.URL.revokeObjectURL(posterblob);
        }
    });
}

function img_proc( elem, imgsrc) {
    //console.log("img_proc: imgsrc="+imgsrc);


    // CSP回避するために、GM_xmlhttpRequestに切り替えた。2017/6/25
    GM_xmlhttpRequest({
        method: "GET",
        url: imgsrc,
        responseType: 'blob',
        synchronous: false,
        onload: function(response) {
            var img = document.createElement('img');
            img.onload = function(e) {
                window.URL.revokeObjectURL(img.src);
            };
            img.src = window.URL.createObjectURL(this.response);

            //console.log("elem="+elem);
            //elem.parent().append(img);
            elem.parentNode.appendChild(img);
            /*
            $(img).css({
                "margin": "10px 0 0",
                "display": "block",
                "max-width": "100%"
            });
            */
            img.style.margin = "10px 0 0";
            img.style.display = "block";
            img.style.maxWidth = "100%";
        }
    });
}

function main() {
    //$('.tweet').find('a').each(function() {
    document.querySelectorAll(".tweet a").forEach(function(elem) {
        //var str = $(this).attr('title');
        var str = elem.getAttribute("title");
        if (str == null || str == undefined || str == "") {
            return;
        }
        // titleが"https://instagram.com"の場合がある。この場合www.instagram.comへのリダイレクトになるので、GM_xmlhttpRequest()が301のリダイレクトページが返ってくるので、videosrc, imgsrcを取得できない。
        str = str.replace(/:\/\/instagram.com/, "://www.instagram.com");
        if (str.indexOf("://www.instagram.com") == -1) {
            return;
        }
        /*
        if ($(this).attr('myloaded') == "done") {
            return;
        }
        */
        var tmp = elem.getAttribute("myloaded");
        if (tmp == "done") {
            return;
        }

        //$(this).attr('myloaded', 'done');
        elem.setAttribute("myloaded", "done");
        var origurl = str;

        //var elem = $(this);
        origurl = origurl.replace(/(.+com\/(.+\/)?p\/.+\/).*/g, "$1?__a=1");
        console.log("starting GM_xmlhttpRequest: " + origurl);
        GM_xmlhttpRequest({
            method: "GET",
            url: origurl,
            onload: function(response) {
                var igjson = JSON.parse(response.responseText);
                var videosrc = null;
                var imgsrc = null;
                //console.log("igjson.graphql.shortcode_media.video_url="+igjson.graphql.shortcode_media.video_url);
                if (igjson.graphql.shortcode_media.video_url) {
                    videosrc = igjson.graphql.shortcode_media.video_url;
                    video_proc( elem, videosrc, igjson.graphql.shortcode_media.thumbnail_src);
                } else {
                    imgsrc = igjson.graphql.shortcode_media.display_resources[igjson.graphql.shortcode_media.display_resources.length - 1].src;
                    img_proc( elem, imgsrc);
                }
            }
        });
    });
}

main();

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe(document, config);
});

var config = {
    childList: true,
    subtree: true
};


observer.observe(document, config);