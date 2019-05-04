// ==UserScript==
// @name         Raw text copier for Yandex TV
// @namespace    https://tv.yandex.ru/
// @version      0.1
// @description  This is copier for Yandex TV, that present raw text for easier copying into any program. Plain text
// @author       You
// @match        https://tv.yandex.ru/*/channels/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';
    
    var textArea = document.createElement("textarea");
    document.querySelector(".channel-controller__schedule").insertBefore(
        textArea, document.querySelector(".channel-schedule"));
    
    var tv = document.querySelectorAll("li.channel-schedule__event");
    var elems = [];
    console.log("Here begins the cycle");
    for (var i = 0; i < tv.length; i++) {
        var time = tv[i].querySelector(".channel-schedule__time").innerText;
        var title = tv[i].querySelector(".channel-schedule__title").innerText;
        
        elems.push({time: time, title: title});
    }
    textArea.cols = 100;
    textArea.rows = elems.length+2;
    console.log("Elems: " + elems);
    
    var text = "";
    for (var i = 0; i < elems.length; i++) {
        text = text + elems[i].time + " - " + elems[i].title + "\n";
    }
    textArea.value = text;
    // textArea.value.replace(/\&nbsp\;/gi, '');
    
    GM_setClipboard(textArea.value);
    var h3 = document.createElement("h3");
    h3.innerText = "Скопировано в буфер обмена!";
    document.querySelector(".channel-controller__schedule").insertBefore(
        h3, textArea);
})();