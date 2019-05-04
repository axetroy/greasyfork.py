// ==UserScript==
// @name         Lang-8 Kana buttons
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// @require     https://greasyfork.org/scripts/19781-wanakana/code/WanaKana.js?version=126349
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery-ui.js
// @match        http://lang-8.com/journals/edit?post_from=Header
// @grant        none
// ==/UserScript==

//(function() {
//    'use strict';
    btnToHiragana = $("<input type='button' value='Hiragana'/>").click(function(){$.ToHiragana();});
    btnToKatakana = $("<input type='button' value='Katakana'/>").click(function(){$.ToKatakana();});
    btnToRomaji = $("<input type='button' value='romaji'/>").click(function(){$.ToRomaji();});
   document.querySelector('#journal_body').addEventListener('mouseup', function () {
       window.mySelection = this.value.substring(this.selectionStart, this.selectionEnd);
       window.startSelection = this.selectionStart;
       window.endSelection = this.selectionEnd;
       window.areaToEdit = this;
   // window.getSelection().toString();
   });    
    $('.box.bx03 h3:last').after(btnToHiragana).after(btnToKatakana).after(btnToRomaji);
//})();

$.ToHiragana = function (){
    $.editText(wanakana.toHiragana(mySelection));
};
$.ToKatakana = function (){
    $.editText(wanakana.toKatakana(mySelection));
};
$.ToRomaji = function (){
    $.editText(wanakana.toRomaji(mySelection));
};

$.editText = function(newSegment){
    var oldText = areaToEdit.value;
    var oldTextBefore = oldText.substring(0,startSelection);
    var oldTextAfter = oldText.substring(endSelection);
    var newText = oldTextBefore + newSegment + oldTextAfter;
    areaToEdit.value = newText;
};