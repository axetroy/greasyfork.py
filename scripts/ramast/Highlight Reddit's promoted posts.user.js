// ==UserScript==
// @name     Highlight Reddit's promoted posts
// @namespace highlight_Reddit'_promoted_posts
// @description Make  Reddit's promoted posts more distinguishable from normal posts 
// @include  https://www.reddit.com/
// @include  https://www.reddit.com/r/*
// @version  2
// @grant    none
// ==/UserScript==

function mark_ads() {
    let spans = Array.filter(document.getElementsByTagName("span"), (span) => span.textContent == "promoted")
    spans.forEach((span) => span.parentElement.parentElement.parentElement.parentElement.style = "background-color: yellow")
}

mark_ads()
//Also rerun the code each time document change (i.e new posts are added when user scroll down)
document.addEventListener("DOMNodeInserted", mark_ads)