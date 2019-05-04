// ==UserScript==
// @name         什么值得买精选页面精简
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Yuxing Sun
// @match        http://www.smzdm.com/jingxuan/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var top = document.getElementsByClassName('J_feed_hot_index');
    if (top.length > 0) {
        top[0].style.display = 'none';
    }
    
    document.getElementById('feed-side').style.display = 'none';
    document.getElementById('feed-main').style.width = '100%';
    
    var feedCountItemCount = 0;
    setInterval(function () {
        var feedContents = document.getElementsByClassName('z-feed-content');
        if (feedCountItemCount != feedContents.length) {
            feedCountItemCount = feedContents.length;
            for(var i = 0; i < feedContents.length; i ++) {
                feedContents[i].style.width = '962px';
            }
        }
    }, 100);
    
    //Your code here...
})();