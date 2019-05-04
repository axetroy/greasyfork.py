// ==UserScript==
// @name        5ch_youtube_embed
// @namespace   https://catherine.v0cyc1pp.com/5ch_youtube_embed.user.js
// @include     http://*.5ch.net/*
// @include     https://*.5ch.net/*
// @include     http://*.bbspink.com/*
// @include     https://*.bbspink.com/*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     0.2
// @grant       none
// @description ５ちゃんねるのつべを埋め込み表示する。
// ==/UserScript==
console.log("5ch_youtube_embed start");



/*
https://youtu.be/9_y6nFjoVp4
https://www.youtube.com/watch?v=9_y6nFjoVp4&feature=youtu.be
*/
function get_embed_url(id) {
    //https://www.youtube.com/embed/VIDEO_ID
    var embed_url = "https://www.youtube.com/embed/" + id;
    console.log("embed_url=" + embed_url);
    return embed_url;
}

function main() {
    document.querySelectorAll("a").forEach(function(elem) {
        var thiselem = elem;

        var str = elem.innerText;

        if (elem.getAttribute("flag5ch_youtube_embed") == "done") {
            return;
        }
        elem.setAttribute("flag5ch_youtube_embed", "done");


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

        var embed_url = get_embed_url(id);


        var elem_p = document.createElement("p");

        // iframe
        var iframe = document.createElement("iframe");
        iframe.src = embed_url;
        iframe.id = "ytplayer";
        iframe.type = "text/html";
        iframe.width = 320;
        iframe.height = 180;
        iframe.frameborder = 0;

 
        thiselem.parentNode.insertBefore(elem_p, thiselem.nextElementSibling);
        elem_p.parentNode.insertBefore(iframe, elem_p.nextElementSibling);

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