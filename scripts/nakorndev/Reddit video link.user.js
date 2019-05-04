// ==UserScript==
// @name         Reddit video link
// @namespace    http://github.com/nakorndev
// @version      0.1.3
// @description  Get a reddit video link from gif or video that hosted from reddit. Only work for new design of reddit (beta reddit). To do that go into reddit hosted video link EX: https://www.reddit.com/r/gifs/comments/8gnf5p/well_i_will_never_look_at_tech_decks_the_same_way/ then wait for a sec and then click the '🔗' icon at top of upvote post button.
// @author       nakorndev
// @match        https://www.reddit.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let cpyElement = (value) => {
        let selector = document.querySelector('.icon.icon-upvote').parentNode.parentNode.parentNode;
        let button = document.createElement('button');
        let text = document.createTextNode('🔗');
        button.style.cursor = 'pointer';
        button.appendChild(text);
        selector.prepend(button);
        button.addEventListener('click', event => {
            navigator.clipboard.writeText(value);
        });
    };
    $.ajax(window.location.href + '/.json')
    .done(res => {
        let output = res[0].data.children[0].data;
        console.log(res);
        cpyElement(output.secure_media ? output.secure_media.reddit_video.fallback_url : output.url);
    });
})();
