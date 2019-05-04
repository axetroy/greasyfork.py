// ==UserScript==
// @name         트위치 클립 다운로드 단축키
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  트위치 클립 페이지에서 d 버튼을 누르면 다운로드 실행
// @author       You
// @match        *://clips.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    window.getKey = function (keyStroke){
        var key = ['d'];
        if ((event.srcElement.tagName != 'INPUT') && (event.srcElement.tagName != 'TEXTAREA')) {
            isNetscape = (document.layers);
            eventChooser = (isNetscape) ? keyStroke.which : event.keyCode;
            which = String.fromCharCode(eventChooser).toLowerCase();
            for (var i in key){
                if (which == key[i]) {
                    control(key[i]);
                }
            }
        }
    };
    document.onkeypress = getKey;

    window.control = function (key){
        if(key==="d"){
            var vid = document.getElementsByTagName('video')[0].currentSrc;
            location.href = vid;
        }
    };
})();