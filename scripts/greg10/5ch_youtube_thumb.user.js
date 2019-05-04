// ==UserScript==
// @name        5ch_youtube_thumb
// @namespace   https://catherine.v0cyc1pp.com/5ch_youtube_thumb.user.js
// @include     http://*.5ch.net/*
// @include     https://*.5ch.net/*
// @include     http://*.bbspink.com/*
// @include     https://*.bbspink.com/*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     0.2
// @grant       none
// @description ５ちゃんねるのつべをサムネイル表示する。
// ==/UserScript==
console.log("5ch_youtube_thumb start");



/*
https://youtu.be/9_y6nFjoVp4
https://www.youtube.com/watch?v=9_y6nFjoVp4&feature=youtu.be
*/
function get_thum_img_url(id) {
    //https://i.ytimg.com/vi/9_y6nFjoVp4/3.jpg
    var thum_img_url = "https://i.ytimg.com/vi/" + id + "/3.jpg";
    console.log("thum_img_url=" + thum_img_url);
    return thum_img_url;
}

function main() {
    document.querySelectorAll("a").forEach(function(elem) {
        var thiselem = elem;

        var str = elem.innerText;

        if (elem.getAttribute("flag5ch_youtube_thumb") == "done") {
            return;
        }
        elem.setAttribute("flag5ch_youtube_thumb", "done");


        //console.log("str="+str);
        var result = str.match(/https?:\/\/youtu.be\/(.+)$/i);
        var result2 = str.match(/https?:\/\/www.youtube.com\/watch\?v=([^&]+)$/i);
        if (result == null && result2 == null) {
            return;
        }
        var id = "";
        if ( result != null ) {
            id = result[1];
        } else if ( result2 != null ) {
            id = result2[1];
        }
        console.log("youtube matched, str=" + str);

        var thum_img_url = get_thum_img_url(id);


        // 一番上のdiv
        var div_base = document.createElement("div");
        div_base.style.float = "none";
        div_base.style.position = "relative";
        div_base.style.width = "100px";

        // クリックしたときにつべに飛ぶ用のaタグ
        var link2img = document.createElement("a");
        link2img.href = str;
        link2img.target = "_blank";
        link2img.flag5ch_youtube_thumb = "done";

        // サムネイル画像
        var img = document.createElement("img");
        img.src = thum_img_url;
        img.border = "1px";
        img.width = "100";

        // 再生ボタン表示用span
        var span = document.createElement("span");
        span.innerText = "＞";
        span.style.backgroundColor = "white";
        span.style.position = "absolute";
        span.style.bottom = "0px";
        span.style.right = "0px";
        span.style.color = "red";

        div_base.appendChild(link2img);
        thiselem.parentNode.insertBefore(div_base, thiselem.nextElementSibling);
        link2img.appendChild(img);
        img.parentNode.insertBefore(span, img.nextElementSibling);

    });
}

main();

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    main();
    observer.observe(document, config);
});

var config = {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true
};

observer.observe(document, config);