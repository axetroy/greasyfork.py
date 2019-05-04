// ==UserScript==
// @name        Kelluvat sitaatit hiiteen @ yle.fi
// @namespace   Rennex/yle.fi
// @description Poistaa YLEn uutisista turhat kelluvat sitaatit
// @include     https://yle.fi/*
// @version     1.3
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("article blockquote, .yle__article__quote { display: none !important; }")
