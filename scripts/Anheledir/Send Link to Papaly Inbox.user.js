// ==UserScript==
// @name         Send Link to Papaly Inbox
// @namespace    https://gordon-breuer.de/
// @version      1.0
// @description  Adds a link to the current webpage to your Papaly Inbox
// @author       Anheledir
// @include http://*/*
// @include https://*/*
// @grant       GM_registerMenuCommand
// ==/UserScript==

function sendToInbox() {
    var e = document.createElement('script');
    e.setAttribute('id', 'clipinet-javascript');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('charset', 'UTF-8');
    e.setAttribute('src', '//papaly.com/items/bookmarklet.js?r=' + Math.floor(Math.random() * 100000));
    document.body.appendChild(e);
}

(function() {
    GM_registerMenuCommand("Send Link to Papaly Inbox", sendToInbox);
})();
