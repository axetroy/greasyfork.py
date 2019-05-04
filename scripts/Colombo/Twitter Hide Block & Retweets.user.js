// ==UserScript==
// @name         Twitter Hide Block & Retweets
// @namespace    zeusex81@gmail.com
// @version      2.2
// @description  Auto hide blocked users and retweets
// @include      https://twitter.com/*
// @license      MIT
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    var addStyle = function(css, id) {
        var style = document.createElement("STYLE");
        if(id) style.id = id;
        style.innerHTML = css;
        document.head.appendChild(style);
    };
    addStyle('[data-you-block="true"] { display:none; }');
    var button = document.querySelector('[role="search"]');
    if(button) {
        button.insertAdjacentHTML('afterend',
        '<button type="button" class="EdgeButton EdgeButton--secondary EdgeButton--medium" '+
        'onclick="this.toggleRetweets();" style="margin-right:16px;">'+
            '<span aria-hidden="true">Hide Retweets</span>'+
        '</button>');
        button.nextSibling.toggleRetweets = function() {
            var style = document.getElementById('hideRetweetsStyle');
            if(style) {
                document.head.removeChild(style);
                this.classList.replace('EdgeButton--danger', 'EdgeButton--secondary');
            } else {
                addStyle('[data-retweet-id] { display:none; }', 'hideRetweetsStyle');
                this.classList.replace('EdgeButton--secondary', 'EdgeButton--danger');
            }
        };
    }
})();