// ==UserScript==
// @name         AP News - mark read articles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://apnews.com/*
// @grant        none
// ==/UserScript==

(function() {
    window.addEventListener('load', function() {
        console.log('Running AP News - mark read articles')

        var visitedUrls = JSON.parse(localStorage.getItem('visitedUrls'))
        if(!visitedUrls){
            visitedUrls = {}
        }

        for(var href in visitedUrls){
            console.log('Marking as read:', href)
            $('a[href=\"' + href + '"]').css('background', 'lightgray')
        }

        $('.articleWithoutPicture > a').click(function(){
            visitedUrls[$(this).attr('href')] = true
            localStorage.setItem('visitedUrls', JSON.stringify(visitedUrls))
        })
    }, false);
})();