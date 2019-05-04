// ==UserScript==
// @name         25pp_direct_download
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Download cracked ipa directly, without bullshit.
// @author       Yiping Deng
// @match        https://www.25pp.com/ios/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var button=document.getElementsByClassName("btn-install-x")[0];
    var url = atob(button.getAttribute("appdownurl")); //get the actual url
    button.href = url;
    button.onclick=null;
})();