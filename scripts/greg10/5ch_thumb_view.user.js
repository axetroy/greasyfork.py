// ==UserScript==
// @name        5ch_thumb_view
// @namespace   http://catherine.v0cyc1pp.com/5ch_thumb_view.user.js
// @include     http://*.5ch.net/*
// @include     https://*.5ch.net/*
// @include     http://*.bbspink.com/*
// @include     https://*.bbspink.com/*
// @author      greg10
// @run-at      document-end
// @license     GPL 3.0
// @version     2.1
// @grant       none
// @description ５ちゃんねるの画像をサムネイル表示する。
// ==/UserScript==
console.log("5ch_thumb_view start");


function main() {
    document.querySelectorAll("a").forEach(function(elem) {
        var thiselem = elem;

        var str = elem.innerText;

        if (elem.getAttribute("myloaded_5tv") == "done") {
            return;
        }
        elem.setAttribute("myloaded_5tv", "done");


        var result = str.match(/(\/\/.*(.jpg|.jpeg|.png|.gif|.bmp|.webp|.jpg:orig|.jpg\?_nc_ht=scontent-nrt1-1.cdninstagram.com))$/i);
        if (result == null) {
            return;
        }
        console.log("image matched, str=" + str);

        var link2img = document.createElement("a");
        link2img.href = str;
        link2img.target = "_blank";
        link2img.myloaded_5tv = "done";
        var elem_p = document.createElement("p");
        var img = document.createElement("img");
        img.src = str;
        img.border = "1px";
        img.width = "100";


        thiselem.parentNode.insertBefore(elem_p, thiselem.nextElementSibling);
        elem_p.parentNode.insertBefore(link2img, elem_p.nextElementSibling);
        link2img.appendChild(img);


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