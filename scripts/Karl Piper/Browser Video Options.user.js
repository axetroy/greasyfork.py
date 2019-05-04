// ==UserScript==
// @name           Browser Video Options
// @description    Customize video playback
// @author         Karl Piper
// @homepage       https://greasyfork.org/en/users/8252
// @namespace      https://greasyfork.org/en/users/8252
// @include        /(https?|file)[\.:]\/{2,3}.*\.(mts|avi|mov|ogm|wav|webm|mkv|flv|ogv|ogg|wmv|mp4|m4p|m4v|mpg|mp2|mpe|mpeg|mpv|3gp|3gpp|3g2)/
// @grant          none
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @icon           https://i.imgur.com/CxT2VtA.png
// @version        2.0
// ==/UserScript==

        controls = true;
        loop = true;
        autoplay = true;
        muted = false;
        width = '';
        height = '';
        poster = '';
        volume = '';

      /*╔══════════╦══════════════════════════════════════╦════════════╗
        ║ Options  ║              Description             ║   Value    ║
        ╠══════════╬══════════════════════════════════════╬════════════╣
        ║ Controls ║ Show video control bar               ║ true/false ║
        ║ Loop     ║ Replay video after ending            ║ true/false ║
        ║ Autoplay ║ Automatically start playing          ║ true/false ║
        ║ Muted    ║ Mute video (override volume)         ║ true/false ║
        ║ Width    ║ Video width, optional                ║ CSS units  ║
        ║ Height   ║ Video height, optional               ║ CSS units  ║
        ║ Poster   ║ Placeholder image, optional          ║ URL        ║
        ║ Volume   ║ Volume, defaults to 1.0, optional    ║ 0.0 - 1.0  ║
        ╚══════════╩══════════════════════════════════════╩════════════╝*/

$(function(){
    //replace with blank video element
    $('video').replaceWith(function () {
        return $('<' + this.nodeName + '>').append($(this).contents());
    });
    //set volume
    $('video').prop('volume', volume);
    //nullify empty settings
    if (!width) {
        width = null;
    }
    if (!height) {
        height = null;
    }
    if (!muted) {
        muted = null;
    }
    if (!poster) {
        poster = null;
    }
    if (!volume) {
        $('video').prop('volume', 1);
    }
    // add self closing attributes to video element
    $('video').attr({ controls, autoplay, loop, width, height, poster, muted });
});