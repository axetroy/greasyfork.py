// ==UserScript==
// @name           feedly_tweaks
// @namespace      https://greasyfork.org/de/users/157797-lual
// @include        *feedly.com/*
// @version        1.1
// @description	   small style tweaks for feedly news reader
// @author         lual
// @grant GM_addStyle
// @grant GM_getResourceURL
// ==/UserScript==
// changes:        2017-11-01 publish on greasyfork
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//GM_addStyle seems to work not correct - so we have to use an alternative:
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// don't change font-weight for read lines
addGlobalStyle('.fx .entry.u0.read .content .title { font-weight: bold !important;}');
// better visibility for current selected line
addGlobalStyle('.selected { color: #A1A1A1 !important;  background-color: #BBDCC6 !important;}');
// upgrade-button - yes, but not so obstrusive
addGlobalStyle('.fx .button.primary.pro, .fx button.primary.pro, .fx-button.primary.pro { background-color: #0c0b0b1a;}');