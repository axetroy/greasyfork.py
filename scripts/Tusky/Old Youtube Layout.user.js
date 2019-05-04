// ==UserScript==
// @name         Old Youtube Layout
// @namespace    http://greasyfork.ork/
// @version      0.1
// @description  youtube go back!
// @author       Tusk
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==
'use strict';

function start() {
    var queryDict = window.location.search.slice(1)
    .split('&')
    .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
        b = b.split('=');
        a[b[0]] = decodeURIComponent(b[1]);
        return a;
    }, {});
    if(queryDict.disable_polymer != true) {
        redirect(Object.keys(queryDict).length);
    }
}

function redirect(params) {
    if(params == 0) {
        window.location.href = window.location.href + '?disable_polymer=true';
    }else {
        window.location.href = window.location.href + '&disable_polymer=true';
    }
}
start();