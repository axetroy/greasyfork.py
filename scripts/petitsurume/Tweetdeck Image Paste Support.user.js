// ==UserScript==
// @name         Tweetdeck Image Paste Support
// @namespace    https://greasyfork.org/ja/users/94414
// @version      0.1
// @description  TweetDeckで画像を貼り付けられるようにします
// @author       petitsurume
// @match        https://tweetdeck.twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    document.addEventListener('paste', function(e){
        if(e.clipboardData) {
            var items = e.clipboardData.items
            if(!items) return
            var files = items.filter(item => item.type.indexOf("image") != -1).map(item => item.getAsFile)
            if(files.length === 0) return
            $(document).trigger("uiFilesAdded",{files})
        }
    })
})();