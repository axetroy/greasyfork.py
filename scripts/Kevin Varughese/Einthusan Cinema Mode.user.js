// ==UserScript==
// @name         Einthusan Cinema Mode
// @namespace    Einthusan Cinema Mode
// @version      0.1
// @description  A plugin for Einthusan. To turn the background darker and so on.
// @author       Kevin K Varughese
// @include        *einthusan.tv/movie/watch/*
// @match        https://greasyfork.org/nb/scripts/2054-change-background-color/code
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';
    var turned = 0;
    var div = document.getElementsByClassName('interaction-bar')[0];
div.innerHTML += '<button id="fullscreen">Cinema</button>';
    var defHtml = div.innerHTML;
    var buttonId = document.getElementById('fullscreen');

    document.body.style.backgroundColor="#FFFFFF";

    function visOff(coll){
    for(var i=0, len=coll.length; i<len; i++)
    {
        coll[i].style.visibility = 'hidden';
    }
}
        function visOn(coll){
    for(var i=0, len=coll.length; i<len; i++)
    {
        coll[i].style.visibility = 'visible';
    }
}

    function chColor(color) {
var colour = color;
    document.body.style.backgroundColor=colour;
    }
    function cinema() {

        if (turned == 0){
            turned = 1;
            chColor('#000000');
           document.getElementById("fullscreen").style.backgroundColor="#111111";
            visOff(document.getElementsByClassName('tabbing'));
            visOff(document.getElementsByClassName('comment-rate-wrapper'));
            visOff(document.getElementsByClassName('toggle red'));
            visOff(document.getElementsByClassName('toggle blue'));
            document.getElementById("supported-languages").style.visibility = 'hidden';
            document.getElementById("UIHeadBar").style.visibility = 'hidden';
            document.getElementById("UIMovieSummary").style.visibility = 'hidden';
            div.style.color='#000000';
            document.body.style.overflow = 'hidden';
        } else {
            turned = 0;
            chColor('#FFFFFF');
            document.getElementById("fullscreen").style.backgroundColor="#FFFFFF";
            visOn(document.getElementsByClassName('tabbing'));
            visOn(document.getElementsByClassName('comment-rate-wrapper'));
            visOn(document.getElementsByClassName('toggle red'));
            visOn(document.getElementsByClassName('toggle blue'));
            document.getElementById("supported-languages").style.visibility = 'visible';
            document.getElementById("UIHeadBar").style.visibility = 'visible';
            document.getElementById("UIMovieSummary").style.visibility = 'visible';
            document.body.style.overflow = 'scroll';
        }
    }

    //buttonId.addEventListener('click', makeDark('#222222'));
     $('#fullscreen').click(function(){
         cinema();
     });


})();