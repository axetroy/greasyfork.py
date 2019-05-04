// ==UserScript==
// @name        HitboxTV Twitch Emotes
// @namespace   https://twitter.com/BitOBytes
// @namespace   http://www.hitbox.tv/BitOBytes
// @description Brings Twitch.tv emotes to Hitbox.tv chat
// @include     *://www.hitbox.tv/*
// @version     1.3
// @grant       none
// ==/UserScript==
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://hbemotes.x10.mx/v3/emotes'); //this is a php script that loads the emotes from a database

var style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('type', 'text/css');
style.setAttribute('href', 'http://www.hbemotes.x10.mx/v2/style/emotes'); //this is a php script that loads the css document

var load = function() {
    var head = document.getElementsByTagName('head')[0];
    if (head && head.hasChildNodes()) {
        head.appendChild(script);
        head.appendChild(style);
    } else {
        setTimeout(load, 500);
    }
}

setTimeout(load, 500);