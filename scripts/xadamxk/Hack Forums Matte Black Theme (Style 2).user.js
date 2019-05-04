// ==UserScript==
// @name            Hack Forums Matte Black Theme (Style 2)
// @namespace       +mK or OMGWTFISTHIS
// @description     Changes Hack Forums to a dark, sleek theme! Style 2.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.5
// @run-at         document-start
// ==/UserScript==
//I would like to thank Snorlax (Profile: http://www.hackforums.net/member.php?action=profile&uid=44755) from Hack Forum for helping me with an issue with this script.

//I would also like to thank Jason Aller (Profile: http://stackoverflow.com/users/214143/jason-aller) from Stack Overflow for helping me consolidate my script.

//For future reference: Anyone wanting to modify this script and release a new variant of it, feel free to without asking. Do NOT make it look tacky, though. I hate tacky designs.

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var styles = [];

styles.push('body {background: #072948 url(http://i.imgur.com/D7s6Acp.png) fixed !important; }');
//If you want to change the background image to your own, simply change the image link in the above line.

styles.push('.logo, div.largetext {display: none!important;}');
//If you want the logo to be added back, simply remove the above line.





