// ==UserScript==
// @name               bilibili fucked words
// @name:zh-CN         哔哩哔哩规避敏感词
// @namespace          https://github.com/cologler/
// @version            0.1.3.1
// @description        take over the world!
// @description:zh-CN  规避 bilibili 敏感词
// @author             cologler
// @match              https://*.bilibili.com/*
// @grant              GM_getResourceText
// @require            https://cdn.jsdelivr.net/string.js/1.8.0/string.min.js
// @resource           wordlist    https://gist.githubusercontent.com/Cologler/fb80a351bb1d5cb4ee635f2694f24fd0/raw/wordlist.json
// @noframes
// ==/UserScript==

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();
(function() { function require(){}; require("string"); })();

(function() {
    'use strict';

    let works = JSON.parse(GM_getResourceText('wordlist'));

    function onCommentSend(div) {
        let ta = div.querySelector('textarea');
        $(ta).focusout(() => {
            let val = S(ta.value);
            works.forEach(z => {
                val = val.replaceAll(z[0], z[1]);
            });
            ta.value = val.toString();
        });
    }

    let observer = new MutationObserver(mrs => {
        mrs.forEach(mr => {
            mr.addedNodes.forEach(z => {
                if (!z.classList) return;
                if (!z.classList.contains('comment-send')) return;
                onCommentSend(z);
            });
        });
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    document.querySelectorAll('.comment-send').forEach(z => {
        onCommentSend(z);
    });
})();