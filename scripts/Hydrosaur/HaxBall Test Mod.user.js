// ==UserScript==
// @name         HaxBall Test Mod
// @namespace    https://greasyfork.org/en/users/165127-hydrosaur
// @version      1.0
// @icon         https://www.haxball.com/favicon.ico
// @description  See if mods work for you
// @author       -Electron-
// @include      https://www.haxball.com/FFuuq69i/__cache_static__/g/game.html
// @supportURL   https://www.reddit.com/message/compose/?to=-Electron-
// @website      https://redd.it/no-post-yet
// @require      https://code.jquery.com/jquery-latest.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let listInterval;

    listInterval = setInterval(function(){
        if($(".roomlist-view").length){
            $(".roomlist-view h1").eq(0).append("<b style='font-size: 0.75em;margin-left: 1rem;color: lawngreen;'>Tampermonkey works!</b>");
            clearInterval(listInterval);
        }
    }, 1000)

    // Your code here...
})();