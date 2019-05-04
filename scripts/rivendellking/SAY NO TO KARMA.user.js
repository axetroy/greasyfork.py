// ==UserScript==
// @name         SAY NO TO KARMA
// @run-at document-start
// @namespace    rivendellking@gmail.com
// @version      1.0
// @description  Tired of Karmapoints?Well Say No To Them Already.
// @author       rivendellking
// @include      http://www.reddit.com/*
// @include      https://www.reddit.com/*
// @grant         GM_addStyle
// ==/UserScript==
GM_addStyle("div.score.unvoted { display: none !important; }"); 
GM_addStyle("div.score.likes { display: none !important; }"); 
GM_addStyle("div.score.dislikes { display: none !important; }"); 
GM_addStyle("span.karma { display: none !important; }"); 
GM_addStyle("div.karma.comment-karma { display: none !important; }"); 
GM_addStyle("span.score.likes { display: none !important; }"); 
GM_addStyle("span.score.dislikes { display: none !important; }"); 
GM_addStyle("span.score.unvoted {display: none !important; }"); 
GM_addStyle("div.score { display: none !important; }"); 