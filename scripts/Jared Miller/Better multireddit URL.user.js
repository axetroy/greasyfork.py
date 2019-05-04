// ==UserScript==
// @name        Better multireddit URL
// @namespace   http://cantcode.com
// @description Replace the browser URL with one you can actually share
// @include     http://www.reddit.com/me/m/*
// @include     https://www.reddit.com/me/m/*
// @version     1.1
// ==/UserScript==

if (document.querySelector('.visibility-group input[name=visibility]:checked').value === 'private')
    return;

var username = /reddit\.com\/user\/([\-\w\.#=]*)\/?(?:comments)?\/?(?:\?(?:[a-z]+=[a-zA-Z0-9_%]*&?)*)?$/i.exec(document.querySelector("#header-bottom-right .user a:first-child").getAttribute('href'))[1];

window.history.replaceState({}, "", "/user/" + username + "/m/" + window.location.pathname.split("/")[3]);