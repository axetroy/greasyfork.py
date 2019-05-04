// ==UserScript==
// @name         HoboEmotes
// @namespace    theflyinghobo
// @version      1.00
// @description  New Maymays
// @grant        none
// @copyright    2016
// @include     *://*.instasynch.com/*
// @include     *://instasynch.com/*
// @include     *://*.instasync.com/*
// @include     *://instasync.com/*
// ==/UserScript==
 
//    { src:"", width:, height:, title:''},
//    { src:"", width:, height:, name:''},
 
var emotes = [
    { src:'http://imgur.com/8J8q6LJ.jpg', width:70 height:70 title:'banana' };
    { src:'http://i.imgur.com/TiSFG9I.jpg', width:70 height:70 title:'crab' };
    { src:'http://imgur.com/ziXxmzs.jpg', width:30 height:60 title:'bapst' };
    ];
 
   
    function addEmotes(){
    emotes.forEach(function(emote){
        window.$codes[emote.title || emote.name] = $('<img>', emote)[0].outerHTML;
    });
}
 
function main(){
    if(!window.$codes || Object.keys(window.$codes).length === 0){
        setTimeout(main, 75);
    }else{
        addEmotes();    
    }
}
if (window.document.readyState === 'complete') {
  main();
} else {
  window.addEventListener('load', main, false);
}