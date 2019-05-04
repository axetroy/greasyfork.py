// ==UserScript==
// @name         博客园 自用精简版
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       bage22
// @match        *.cnblogs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function removeAd(){
        let len = arguments.length;
        for(var i=0;i<len;i++){
            $(arguments[i]).fadeOut("slow");
        }
    }
    removeAd("#cnblogs_c2","#comment_form","#cnblogs_c1","#sideBarMain","#blog_post_info_block");
})();