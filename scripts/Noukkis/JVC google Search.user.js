// ==UserScript==
// @name         JVC google Search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Faites des recherches Google avec JVC
// @author       Noukkis
// @match        http://www.jeuxvideo.com/forums/*
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
    $('.form-rech-forum').attr('action', 'javascript:window.location.replace("//www.google.fr/search?q=allintitle: "+$("#search_in_forum").val()+" sur le "+document.title.replace(" - jeuxvideo.com", "")+" site:http://www.jeuxvideo.com/forums/");');
})();