// ==UserScript==
// @name         Spotify open in app
// @author       OrdinaryDog
// @description  This userscript redirects open.spotify.com links to the desktop app
// @version      1.1
// @license      MIT License
// @copyright    Copyright (C) 2019, by ordinarydog@protonmail.com
// @match        http://open.spotify.com/*
// @match        https://open.spotify.com/*
// @namespace    https://greasyfork.org/users/172431
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var data=document.URL.match(/[\/\&](track|playlist|album|artist|show|episode)\/([^\&\#\/\?]+)/i);
    console.log("This is a "+data[1]+" with id:"+data[2]+"\nAttempting to redirect");
    window.location.replace('spotify:'+data[1]+':'+data[2]);
})();