// ==UserScript==
// @name         LinkSwapper
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Swaps a specified keyword with a specified link
// @author       You
// @match        *://discordapp.com/channels/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Enter your own room here
    const keyword = '';
    const link = '';

    const fetchTextarea = () => {
        if(!document.querySelectorAll('.content-yTz4x3 textarea')[0]){
            window.requestAnimationFrame(fetchTextarea);
        } else {
            let textarea = document.querySelectorAll('.content-yTz4x3 textarea')[0];
            textarea.onkeyup = (e) => {
                if(e.ctrlKey && e.which === 16){
                    textarea.value = textarea.value.replace(keyword, link);
                }
            }
        }
    }

    const checkChannel = (changes) => {
        for(let change of changes){
            if(change.addedNodes.length){
                fetchTextarea();
            }
        }
    }

    const channel = new MutationObserver(checkChannel);

    const fetchChannel = () => {
        if(!document.getElementsByClassName('content-yTz4x3')[0]){
            window.requestAnimationFrame(fetchChannel);
        } else {
            fetchTextarea();
            channel.observe(
                document.getElementsByClassName('content-yTz4x3')[0].firstChild,
                {childList:true}
            );
        }
    }

    window.onload = () => {
        fetchChannel();
    }

})();