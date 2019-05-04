// ==UserScript==
// @name         Facebook Wower
// @namespace    facebookWow
// @version      0.1
// @description  This is the poison that is Facebook Wower.
// @author       William Nielsen
// @match        http*://www.facebook.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function scanForPosts(){
    var likeList = document.querySelectorAll('[data-testid="fb-ufi-likelink"]') ;


    for( var i = 0; i < likeList.length; i++ ){
        var a = likeList[i].parentElement.querySelector('[aria-label="Wow"]');
        if( a ){
            console.log('Wowed a post: ' + i);
            a.setAttribute('aria-pressed', 'true');
            a.click();
        }else{
            console.log("a is null");
        }

    }
}



document.addEventListener("keyup", scanForPosts);