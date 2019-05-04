// ==UserScript==
// @name        RES Night mode code block fix
// @description https://www.reddit.com/r/Enhancement/comments/33588b/feature_request_can_we_please_make_codeblocks/
// @namespace   defproc/gm/reddit.com/r/Enhancement/comments/33588b/feature_request_can_we_please_make_codeblocks/cqidb3j
// @include     *.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

var style = document.createElement("style");
style.innerHTML = "pre, code { background: #111 !important; }";
document.querySelector("head").appendChild(style);