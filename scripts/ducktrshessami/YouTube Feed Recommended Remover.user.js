// ==UserScript==
// @name         YouTube Feed Recommended Remover
// @namespace    AAAAAAAA.com
// @version      1.1
// @description  Removes any home page feed entries that have a subtitle that includes the word "recommended"
// @author       ducktrshessami
// @match        *://www.youtube.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

document.body.addEventListener("DOMNodeInserted", function() {
    const feed = $("div#contents.style-scope.ytd-section-list-renderer")[0]; // Assumed there's only one feed

    function helper(element) { // Helps find the feed entry's element
        if (element == document.body) { // Went too far
            return;
        }
        return element.parentNode == feed ? element : helper(element.parentNode); // Recurse
    }

    function dothething() { // Event response
        var target, annotations = $("yt-formatted-string#title-annotation.style-scope.ytd-shelf-renderer");
        for (var i = 0; i < annotations.length; ++i) {
            if (annotations[i].innerHTML.toLowerCase().includes("recommended")) { // Target located
                if (target = helper(annotations[i])) {
                    target.remove();
                    console.info("Target destroyed");
                }
            }
        }
    }

    if (feed) {
        if (!feed.getAttribute("ytfrr")) {
            feed.setAttribute("ytfrr", true);
            feed.addEventListener("DOMNodeInserted", dothething); // Here we go
        }
    }
});