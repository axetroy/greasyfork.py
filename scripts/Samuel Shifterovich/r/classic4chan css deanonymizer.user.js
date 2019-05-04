// ==UserScript==
// @name         /r/classic4chan css deanonymizer
// @namespace    https://reddit.com
// @include      https://*.reddit.com/r/classic4chan/*
// @version      1.0
// @description  Deanonymize /r/classic4chan users.
// @author       Samuel Shifterovich (https://github.com/Shifterovich)
// ==/UserScript==

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

style = '.author+*:before{content: none}.link:not(.spam) .author,.comment .author,.side .author {display: inline!important}';
addStyleString(style);